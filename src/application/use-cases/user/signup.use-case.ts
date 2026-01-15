import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from '../../../domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.interface';
import { APP_CONSTANTS, ERROR_MESSAGES } from '../../../shared/constants';

export interface SignUpInput {
  username: string;
  password: string;
  birthdate: string;
}

export interface SignUpOutput {
  id: string;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: SignUpInput): Promise<SignUpOutput> {
    const existingUser = await this.userRepository.findByUsername(
      input.username,
    );

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.USERNAME_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(
      input.password,
      APP_CONSTANTS.BCRYPT_SALT_ROUNDS,
    );

    const user = new User();
    user.id = uuidv4();
    user.username = input.username;
    user.password = hashedPassword;
    user.birthdate = input.birthdate;
    user.balance = APP_CONSTANTS.INITIAL_USER_BALANCE;

    await this.userRepository.create(user);

    return { id: user.id };
  }
}
