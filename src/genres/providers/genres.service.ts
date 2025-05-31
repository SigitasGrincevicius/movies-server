import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Genre } from '../genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { PatchGenreDto } from '../dtos/patch-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    /**
     * Inject genresRepository
     */
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  public async createGenre(createGenreDto: CreateGenreDto) {
    // Check if genre exists with same name
    const existingGenre = await this.genresRepository.findOne({
      where: { name: createGenreDto.name },
    });
    // Handle exception
    if (existingGenre) {
      throw new ConflictException(
        `Genre with name '${createGenreDto.name}' already exists`,
      );
    }

    // Create a new genre
    let newGenre = this.genresRepository.create(createGenreDto);
    newGenre = await this.genresRepository.save(newGenre);

    return newGenre;
  }

  public async updateGenre(patchGenreDto: PatchGenreDto) {
    // Find the genre by ID
    const { id, ...genreUpdate } = patchGenreDto;
    const genre = await this.genresRepository.findOne({
      where: { id },
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID "${id}" not found"`);
    }

    // Update the genre's fields
    Object.assign(genre, genreUpdate);

    // Save the updated genre
    const updatedGenre = await this.genresRepository.save(genre);

    // Return the updated genre
    return updatedGenre;
  }

  public async getAllGenres() {
    const allGenres = await this.genresRepository.find();
    return allGenres;
  }

  public async findMultipleGenres(genres: string[]) {
    let results = await this.genresRepository.find({
      where: {
        id: In(genres),
      },
    });

    return results;
  }
}
