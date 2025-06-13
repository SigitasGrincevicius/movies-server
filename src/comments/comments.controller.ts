import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { GetCommentsByMovieDto } from './dtos/get-comments-by-movie.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(
    @Body() createdCommentDto: CreateCommentDto,
    @ActiveUser() userData: ActiveUserData,
  ) {
    return this.commentsService.createComment(createdCommentDto, userData);
  }

  @Patch(':id')
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @ActiveUser() userData: ActiveUserData,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto, userData);
  }

  @Delete(':id')
  deleteComment(
    @Param('id') id: string,
    @ActiveUser() userData: ActiveUserData,
  ) {
    return this.commentsService.deleteComment(id, userData);
  }

  @Get(':id')
  findComment(@Param('id') id: string) {
    return this.commentsService.findOneById(id);
  }

  @Get('/movie/:movieId')
  findCommentsByMovie(
    @Param() getCommentsByMovieDto: GetCommentsByMovieDto,
  ) {
    return this.commentsService.findByMovieId(getCommentsByMovieDto.movieId);
  }
}
