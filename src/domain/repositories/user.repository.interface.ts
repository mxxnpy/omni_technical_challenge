import { User } from '../entities/user.entity';
import { INJECTION_TOKENS } from '../../shared/constants';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
}

export const USER_REPOSITORY = INJECTION_TOKENS.USER_REPOSITORY;
