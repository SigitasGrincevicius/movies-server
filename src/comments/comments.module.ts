import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './providers/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { Comment } from './comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, MoviesModule],
  exports: [CommentsService],
})
export class CommentsModule {}
