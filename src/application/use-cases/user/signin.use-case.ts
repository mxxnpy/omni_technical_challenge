import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.interface';
import { APP_CONSTANTS, ERROR_MESSAGES } from '../../../shared/constants';

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignInOutput {
  token: string;
  expiresIn: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.findByUsername(input.username);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    return {
      token,
      expiresIn: APP_CONSTANTS.TOKEN_EXPIRATION,
    };
  }
}
