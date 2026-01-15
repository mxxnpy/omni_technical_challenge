import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { SignUpUseCase } from './signup.use-case';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface';

describe('SignUpUseCase', () => {
  let useCase: SignUpUseCase;
  let mockUserRepository: {
    findByUsername: jest.Mock;
    create: jest.Mock;
  };

  beforeEach(async () => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('should create a new user successfully', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockUserRepository.create.mockImplementation((user) =>
      Promise.resolve(user),
    );

    const input = {
      username: 'leandro_silva',
      password: 'challenge_0mni',
      birthdate: '2002-04-23',
    };

    const result = await useCase.execute(input);

    expect(result).toHaveProperty('id');
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('leandro_silva');
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it('should throw ConflictException if username already exists', async () => {
    mockUserRepository.findByUsername.mockResolvedValue({ id: 'existing-id' });

    const input = {
      username: 'leandro_silva',
      password: 'ch4llenge_0mni',
      birthdate: '2002-04-23',
    };

    await expect(useCase.execute(input)).rejects.toThrow(ConflictException);
  });
});
