import { ReviewService } from './review.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { User } from '../user/entities/user.entity';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) { }

  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Review)
  async createReview(
    @Args('data') data: CreateReviewInput,
    @CurrentUser() currentUser: User,
  ) {
    const review = await this.reviewService.createReview(data, currentUser);
    return review;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Review])
  async findAllReviews(@CurrentUser() currentUser: User) {
    const reviews = await this.reviewService.getReviewsByCurrentUser(
      currentUser,
    );
    return reviews;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Review])
  async findAllReviewsByRestaurant(@Args('restaurantId') restaurantId: string) {
    const reviews = await this.reviewService.getReviewsByRestaurant(
      restaurantId,
    );
    return reviews;
  }
}
