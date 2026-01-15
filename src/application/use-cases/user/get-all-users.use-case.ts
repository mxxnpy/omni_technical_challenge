import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.interface';

export interface UserOutput {
  id: string;
  username: string;
  birthdate: string;
  balance: string;
}

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserOutput[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      birthdate: user.birthdate,
      balance: String(user.balance),
    }));
  }
}
