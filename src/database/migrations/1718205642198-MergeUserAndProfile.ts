import { MigrationInterface, QueryRunner } from 'typeorm';

export class MergeUserAndProfile1718205642198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TYPE profiles_gender_enum rename to users_gender_enum;
        
        ALTER TABLE public.users
        ADD COLUMN phone_number varchar(255),
        ADD COLUMN birthdate date,
        ADD COLUMN address_id uuid,
        ADD COLUMN gender public.users_gender_enum,
        ADD COLUMN bio varchar(255),
        ADD COLUMN denomination_id int4,
        ADD COLUMN statement_of_faith text;

        ALTER TABLE public.users
        ADD CONSTRAINT fk_user_address_id FOREIGN KEY (address_id) REFERENCES public.addresses(id),
        ADD CONSTRAINT fk_user_denomination_id FOREIGN KEY (denomination_id) REFERENCES public.denominations(id);

        UPDATE public.users
        SET phone_number = public.profiles.phone_number,
            birthdate = public.profiles.birthdate,
            address_id = public.profiles.address_id,
            gender = public.profiles.gender,
            bio = public.profiles.bio,
            denomination_id = public.profiles.denomination_id,
            statement_of_faith = public.profiles.statement_of_faith
        FROM public.profiles
        WHERE public.users.id = public.profiles.id;

        DROP TABLE public.profiles;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.profiles (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            phone_number varchar(255) NOT NULL,
            birthdate date NOT NULL,
            gender public.users_gender_enum NOT NULL,
            bio varchar(255) NOT NULL,
            statement_of_faith text NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            user_id uuid NOT NULL,
            address_id uuid NOT NULL,
            denomination_id int4 NOT NULL,
            CONSTRAINT pk_profiles PRIMARY KEY (id)
        );

        ALTER TYPE users_gender_enum rename to profiles_gender_enum;

        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);
        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_address_id FOREIGN KEY (address_id) REFERENCES public.addresses(id);
        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_denomination_id FOREIGN KEY (denomination_id) REFERENCES public.denominations(id);

        UPDATE public.profiles
        SET phone_number = public.users.phone_number,
            birthdate = public.users.birthdate,
            address_id = public.users.address_id,
            user_id = public.users.id,
            gender = public.users.gender,
            bio = public.users.bio,
            denomination_id = public.users.denomination_id,
            statement_of_faith = public.users.statement_of_faith
        FROM public.users
        WHERE public.profiles.id = public.users.id;

        ALTER TABLE public.users
        DROP CONSTRAINT fk_user_address_id,
        DROP CONSTRAINT fk_user_denomination_id;

        ALTER TABLE public.users
        DROP COLUMN phone_number,
        DROP COLUMN birthdate,
        DROP COLUMN address_id,
        DROP COLUMN gender,
        DROP COLUMN bio,
        DROP COLUMN denomination_id,
        DROP COLUMN statement_of_faith;
        `);
  }
}
