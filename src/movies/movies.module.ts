import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { GenresModule } from 'src/genres/genres.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateMovieProvider } from './providers/create-movie.provider';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, CreateMovieProvider],
  imports: [
    UsersModule,
    GenresModule,
    PaginationModule,
    TypeOrmModule.forFeature([Movie]),
    MailModule,
  ],
})
export class MoviesModule {}
