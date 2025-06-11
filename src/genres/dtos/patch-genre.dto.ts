import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PatchGenreDto extends PartialType(CreateGenreDto) {}
