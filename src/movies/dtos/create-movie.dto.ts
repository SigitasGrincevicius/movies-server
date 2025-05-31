import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Dark Knight',
    description: 'The title of the movie',
    maxLength: 250,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  title: string;

  @ApiProperty({
    example: ['e2c0c4e7-97dc-4d76-a9df-4b6a318ffba4'],
    description: 'Array of ids of genres',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsUUID('4', { each: true })
  genres: string[];

  @ApiProperty({
    example: 'A thrilling movie about a vigilante hero.',
    description: 'A brief description of the movie',
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    example: 2008,
    description: 'The release year of the movie',
    minimum: 1900,
    maximum: new Date().getFullYear(),
  })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiPropertyOptional({
    example: 'Christopher Nolan',
    description: 'The name of the movie director',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(200)
  director?: string;

  @ApiProperty({
    example: 9.0,
    description: 'Tha rating of the movie',
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiPropertyOptional({
    example: 'https://example.com/images/dark-knight.jpg',
    description: 'A URL to the movie poster or image',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
