import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [FavoriteService, FavoriteResolver],
  imports: [TypeOrmModule.forFeature([Favorite]), RestaurantModule, UserModule],
})
export class FavoriteModule {}
