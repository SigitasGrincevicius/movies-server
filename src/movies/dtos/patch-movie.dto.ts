import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class PatchMovieDto extends PartialType(CreateMovieDto) {}
