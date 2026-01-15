import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInUseCase } from './signin.use-case';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface';

describe('SignInUseCase', () => {
  let useCase: SignInUseCase;
  let mockUserRepository: {
    findByUsername: jest.Mock;
  };

  beforeEach(async () => {
    mockUserRepository = {
      findByUsername: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<SignInUseCase>(SignInUseCase);
  });

  it('should return token on successful login', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    mockUserRepository.findByUsername.mockResolvedValue({
      id: 'user-id',
      username: 'testuser',
      password: hashedPassword,
    });

    const input = {
      username: 'testuser',
      password: 'password123',
    };

    const result = await useCase.execute(input);

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('expiresIn', '1h');
  });

  it('should throw UnauthorizedException if user not found', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    const input = {
      username: 'nonexistent',
      password: 'password123',
    };

    await expect(useCase.execute(input)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const hashedPassword = await bcrypt.hash('correctpassword', 10);
    mockUserRepository.findByUsername.mockResolvedValue({
      id: 'user-id',
      username: 'testuser',
      password: hashedPassword,
    });

    const input = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    await expect(useCase.execute(input)).rejects.toThrow(UnauthorizedException);
  });
});
