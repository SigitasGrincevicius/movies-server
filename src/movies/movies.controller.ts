import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { PatchMovieDto } from './dtos/patch-movie.dto';
import { GetMoviesDto } from './dtos/get-movies.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Get()
  public async getMovies(
    @Query() getMoviesDto: GetMoviesDto,
    @Req() req: Request,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const originalUrl = req.originalUrl;

    return await this.moviesService.findAll(getMoviesDto, baseUrl, originalUrl);
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
  @UseInterceptors(FileInterceptor('file'))
  public async createMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
    @ActiveUser() userData: ActiveUserData,
  ) {
    if (file) {
      // Upload to S3 and set imageUrl
      createMovieDto.imageUrl = await this.moviesService.uploadImageToS3(file);
    }

    return this.moviesService.create(createMovieDto, userData);
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
  @Patch(':id')
  public updateMovie(
    @Param('id') id: string,
    @Body() patchMovieDto: PatchMovieDto,
    @ActiveUser() userData: ActiveUserData,
  ) {
    return this.moviesService.update(id, patchMovieDto, userData);
  }

  @Delete(':id')
  public async deleteMovie(
    @Param('id') id: string,
    @ActiveUser() userData: ActiveUserData,
  ) {
    return await this.moviesService.delete(id, userData);
  }
}
