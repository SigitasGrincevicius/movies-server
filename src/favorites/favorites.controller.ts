import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FavoritesService } from './providers/favorites.service';
import { RemoveFavoriteDto } from './dtos/remove-favorite.dto';
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

  @Delete()
  removeFavorite(@Query() removeFavoriteDto: RemoveFavoriteDto) {
    const { movieId, userId } = removeFavoriteDto;
    return this.favoritesService.deleteFavorite(movieId, userId);
  }

  @Get()
  getFavorites() {
    return this.favoritesService.getAllFavorites();
  }
}
