import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { BookingModule } from '../booking/booking.module';
import { Booking } from '../booking/entities/booking.entity';

@Module({
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
  imports: [
    TypeOrmModule.forFeature([Review, Restaurant, Booking]),
    BookingModule,
  ],
})
export class ReviewModule {}
