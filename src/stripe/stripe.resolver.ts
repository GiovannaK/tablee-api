import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { StripeCreateAccountLink } from './dto/StripeCreateAccountLink';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { StripeCreateLoginLink } from './dto/StripeCreateLoginLink';

@Resolver()
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => StripeCreateAccountLink)
  async createAccountLink(
    @Args('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<StripeCreateAccountLink> {
    const accountLink = await this.stripeService.createAccountLink(
      currentUser,
      id,
    );
    return accountLink;
  }

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => StripeCreateLoginLink)
  async createLoginLink(
    @Args('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<StripeCreateLoginLink> {
    const loginLink = await this.stripeService.createLoginLink(currentUser, id);
    return loginLink;
  }
}
