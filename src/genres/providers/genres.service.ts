import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository, IsNull } from 'typeorm';
import { Genre } from '../genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { PatchGenreDto } from '../dtos/patch-genre.dto';

import { Logger } from '@nestjs/common';

@Injectable()
export class GenresService {
  private readonly logger = new Logger(GenresService.name);

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

  public async findOneById(genreId: string) {
    try {
      // Find the genre by ID
      const genre = await this.genresRepository.findOne({
        where: { id: genreId, deletedAt: IsNull() },
      });
      return genre;
    } catch (error) {
      this.logger.error(
        `Error fetching genre with id ${genreId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to fetch genre with id ${genreId}. Please try again later.`,
      );
    }
  }

  public async updateGenre(genreId: string, patchGenreDto: PatchGenreDto) {
    const genre = await this.findOneById(genreId);
    if (!genre) {
      throw new NotFoundException(`Genre with ID '${genreId}' not found`);
    }

    // Update the genre's fields
    Object.assign(genre, patchGenreDto);

    try {
      // Save the updated genre
      const updatedGenre = await this.genresRepository.save(genre);
      // Return updated genre
      return updatedGenre;
    } catch (error) {
      this.logger.error(
        `Error saving genre with id ${genreId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to save genre with id ${genreId}. Please try again later.`,
      );
    }
  }

  public async getAllGenres() {
    const allGenres = await this.genresRepository.find({
      where: { deletedAt: IsNull() },
    });
    return allGenres;
  }

  public async findMultipleGenres(genres: string[]) {
    let results = await this.genresRepository.find({
      where: {
        id: In(genres),
        deletedAt: IsNull(),
      },
    });

    return results;
  }

  public async deleteGenre(genreId: string) {
    const genre = await this.findOneById(genreId);
    if (!genre) {
      throw new NotFoundException(`Genre with ID '${genreId}' not found`);
    }

    try {
      // Perform soft delete
      await this.genresRepository.softDelete(genreId);
      return { successful: true, genreId };
    } catch (error) {
      this.logger.error(
        `Error soft deleting genre with id ${genreId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to soft delete with id ${genreId}. Please try again later.`,
      );
    }
  }
}
