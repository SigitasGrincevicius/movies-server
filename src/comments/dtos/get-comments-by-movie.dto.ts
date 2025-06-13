import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCommentsByMovieDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
}
