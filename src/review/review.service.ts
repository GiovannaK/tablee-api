/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './dto/create-review.input';
import { Review } from './entities/review.entity';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly bookingService: BookingService,
  ) {}

  async createReview(createReviewInput: CreateReviewInput, currentUser: User) {
    const findBooking = await this.bookingService.getBookingWithoutRelations(
      createReviewInput.bookingId,
    );

    const createReview = await this.reviewRepository.create({
      ...createReviewInput,
      user: currentUser,
      booking: findBooking,
    });

    const createdReview = await this.reviewRepository.save(createReview);

    if (!createdReview) {
      throw new InternalServerErrorException('Cannot create review');
    }

    return createdReview;
  }

  async getReviewsByCurrentUser(currentUser: User) {
    const reviews = await this.reviewRepository.find({
      relations: ['user', 'booking'],
      where: { user: currentUser },
    });

    return reviews;
  }

  async getReviewsByRestaurant(restaurantId: string) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.booking', 'booking')
      .innerJoinAndSelect('booking.restaurant', 'restaurant')
      .innerJoinAndSelect('review.user', 'user')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getMany();

    const average =
      reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

    return {
      reviews,
      average
    };
  }
}
