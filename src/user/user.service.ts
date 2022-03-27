/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.Input';
const crypto = require('crypto');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  generateLoginToken() {
    const createToken = crypto.randomBytes(20).toString('hex');
    return createToken;
  }

  generateLoginTokenExpiration() {
    // expires in 10 min
    const generateExpiration = Date.now() + 10 * (60 * 1000);
    return generateExpiration;
  }

  async isEmailAlreadyExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new BadRequestException(`${email} already in use`);
    }
    return;
  }

  async createUser(createUserInput: CreateUserInput) {
    await this.isEmailAlreadyExists(createUserInput.email);
    const loginToken = this.generateLoginToken();
    const expirationLoginToken = String(this.generateLoginTokenExpiration());

    const user = await this.userRepository.create({
      ...createUserInput,
      loginToken,
      expirationLoginToken,
    });

    const createdUser = await this.userRepository.save(user);

    if (!createdUser) {
      throw new InternalServerErrorException('User could not be created');
    }

    const subject = 'Tablee: Faça login para continuar';
    const text = `Sua conta foi criada com sucesso, clique no link para fazer login: \n
      ${process.env.CLIENT_URL}/auth/${createdUser.loginToken}
    `;

    await this.emailService.sendMail(createdUser.email, subject, text);

    return createdUser;
  }
}
