import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class PatchMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    description: 'The ID of the movie that needs to be updated',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
