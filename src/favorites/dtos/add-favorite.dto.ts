import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;
}
