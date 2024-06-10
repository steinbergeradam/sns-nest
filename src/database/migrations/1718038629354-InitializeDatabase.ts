import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeDatabase1718038629354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.addresses (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            street varchar(255) NOT NULL,
            city varchar(255) NOT NULL,
            state varchar(255) NOT NULL,
            zip varchar(255) NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            CONSTRAINT pk_addresses PRIMARY KEY (id)
        );

        CREATE TABLE public.denominations (
            id serial4 NOT NULL,
            "name" varchar(255) NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            CONSTRAINT pk_denominations PRIMARY KEY (id)
        );

        CREATE TABLE public.friend_statuses (
            id serial4 NOT NULL,
            "name" varchar(255) NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            CONSTRAINT pk_friend_statuses PRIMARY KEY (id)
        );

        CREATE TABLE public.friends (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            user_1_id uuid NOT NULL,
            user_2_id uuid NOT NULL,
            status int4 NOT NULL,
            CONSTRAINT pk_friends PRIMARY KEY (id)
        );

        ALTER TABLE public.friends ADD CONSTRAINT fk_friend_status_id FOREIGN KEY (status) REFERENCES public.friend_statuses(id);
        ALTER TABLE public.friends ADD CONSTRAINT fk_friend_user_1_id FOREIGN KEY (user_1_id) REFERENCES public.users(id);
        ALTER TABLE public.friends ADD CONSTRAINT fk_friend_user_2_id FOREIGN KEY (user_2_id) REFERENCES public.users(id);

        CREATE TYPE public.profiles_gender_enum AS ENUM('M', 'F');

        CREATE TABLE public.profiles (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            phone_number varchar(255) NOT NULL,
            birthdate date NOT NULL,
            gender public.profiles_gender_enum NOT NULL,
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

        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_address_id FOREIGN KEY (address_id) REFERENCES public.addresses(id);
        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_denomination_id FOREIGN KEY (denomination_id) REFERENCES public.denominations(id);
        ALTER TABLE public.profiles ADD CONSTRAINT fk_profile_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);

        CREATE TABLE public.posts (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            "content" text NOT NULL,
            media varchar(255) NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            author_id uuid NOT NULL,
            recipient_id uuid NOT NULL,
            CONSTRAINT pk_posts PRIMARY KEY (id)
        );

        ALTER TABLE public.posts ADD CONSTRAINT fk_post_author_id FOREIGN KEY (author_id) REFERENCES public.users(id);
        ALTER TABLE public.posts ADD CONSTRAINT fk_post_recipient_id FOREIGN KEY (recipient_id) REFERENCES public.users(id);

        CREATE TABLE public."comments" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            "content" text NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            author_id uuid NOT NULL,
            post_id uuid NOT NULL,
            CONSTRAINT pk_comments PRIMARY KEY (id)
        );

        ALTER TABLE public."comments" ADD CONSTRAINT fk_comment_author_id FOREIGN KEY (author_id) REFERENCES public.users(id);
        ALTER TABLE public."comments" ADD CONSTRAINT fk_comment_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id);

        INSERT INTO public.denominations ("name")
        VALUES
        ('Anglican'),
        ('Baptist'),
        ('Catholic'),
        ('Charismatic'),
        ('Episcopalian'),
        ('Evangelical'),
        ('Lutheran'),
        ('Methodist'),
        ('NonDenominational'),
        ('Orthodox'),
        ('Pentecostal'),
        ('Presbyterian'),
        ('Protestant'),
        ('Reformed'),
        ('Other');

        INSERT INTO public.friend_statuses ("name")
        VALUES
        ('Pending'),
        ('Accepted'),
        ('Declined'),
        ('Blocked');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public."comments";
        DROP TABLE public.posts;
        DROP TABLE public.profiles;
        DROP TYPE public.profiles_gender_enum;
        DROP TABLE public.friends;
        DROP TABLE public.friend_statuses;
        DROP TABLE public.denominations;
        DROP TABLE public.addresses;
        `);
  }
}
