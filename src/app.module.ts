import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { FriendModule } from './friend/friend.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FriendModule,
    PostModule,
    CommentModule,
    UserModule,
  ],
})
export class AppModule {}
