import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FavoritesService } from './providers/favorites.service';
import { AddFavoriteDto } from './dtos/add-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(
    /**
     * Inject favoritesService
     */
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  addFavorite(
    @Body() addFavoriteDto: AddFavoriteDto,
    @ActiveUser() userData: ActiveUserData,
  ) {
    const { movieId } = addFavoriteDto;
    return this.favoritesService.addFavorite(movieId, userData);
  }

  @Delete(':movieId')
  removeFavorite(@Param('movieId') movieId: string,@ActiveUser() userData: ActiveUserData) {
    return this.favoritesService.deleteFavorite(movieId, userData);
  }

  @Get()
  getFavorites() {
    return this.favoritesService.getAllFavorites();
  }
}
