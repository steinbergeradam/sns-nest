import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { FriendModule } from './friend/friend.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FriendModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
