import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GenresService } from './providers/genres.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { PatchGenreDto } from './dtos/patch-genre.dto';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('genres')
export class GenresController {
  constructor(
    /**
     * Inject Genres Service
     */
    private readonly genresService: GenresService,
  ) {}

  @Get()
  public getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @Post()
  public createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Patch(':genreId')
  public patchGenre(
    @Param('genreId') genreId: string,
    @Body() patchGenreDto: PatchGenreDto,
  ) {
    return this.genresService.updateGenre(genreId, patchGenreDto);
  }

  @Auth(AuthType.Admin)
  @Delete(':genreId')
  public deleteGenre(@Param('genreID') genreId: string) {
    return this.genresService.deleteGenre(genreId);
  }
}
