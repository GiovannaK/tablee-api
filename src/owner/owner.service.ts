import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UserRole } from 'src/user/entities/role/userRole';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async createOwner(createUserInput: CreateOwnerInput) {
    await this.userService.isEmailAlreadyExists(createUserInput.email);
    const loginToken = this.userService.generateLoginToken();
    const expirationLoginToken = String(
      this.userService.generateLoginTokenExpiration(),
    );

    const user = await this.userRepository.create({
      ...createUserInput,
      loginToken,
      expirationLoginToken,
      role: UserRole.OWNER,
      profile: {},
    });

    const createdUser = await this.userRepository.save(user);

    if (!createdUser) {
      throw new InternalServerErrorException('Cannot create user');
    }

    const subject = 'Tablee: Faça login para continuar';
    const text = `Sua conta foi criada com sucesso, clique no link para fazer login: \n
      ${process.env.CLIENT_URL}/auth/${createdUser.loginToken}
    `;

    await this.emailService.sendMail(createdUser.email, subject, text);

    return createdUser;
  }
}
