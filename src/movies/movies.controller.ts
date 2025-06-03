import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { PatchMovieDto } from './dtos/patch-movie.dto';
import { GetMoviesDto } from './dtos/get-movies.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(
    /**
     * Inject Movies Service
     */
    private readonly moviesService: MoviesService,
  ) {}

  /**
   * GET localhost:3000/movies/:userId
   */
  @Get('/{:userId}')
  public async getMovies(
    @Param('userId') userId: string,
    @Query() movieQuery: GetMoviesDto,
  ) {
    return await this.moviesService.findAll(movieQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates a new movie',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your movie is created successfully',
  })
  @ApiBody({
    description: 'The details of the movie to create',
    type: CreateMovieDto,
  })
  @Post()
  public createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.moviesService.create(createMovieDto, user);
  }

  @ApiOperation({
    summary: 'Updates an existing movie',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your movie is updated successfully',
  })
  @ApiBody({
    description: 'The details of the movie to update',
    type: PatchMovieDto,
  })
  @Patch()
  public updateMovie(@Body() patchMovieDto: PatchMovieDto) {
    return this.moviesService.update(patchMovieDto);
  }

  @Delete('/:id')
  public async deleteMovie(@Param('id') id: string) {
    return await this.moviesService.delete(id);
  }
}
