import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveFavoriteDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
