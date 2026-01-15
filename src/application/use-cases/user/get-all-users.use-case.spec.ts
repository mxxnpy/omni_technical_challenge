import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersUseCase } from './get-all-users.use-case';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  let mockUserRepository: {
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    mockUserRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
  });

  it('should return all users with formatted balance', async () => {
    mockUserRepository.findAll.mockResolvedValue([
      {
        id: 'user-1',
        username: 'user1',
        birthdate: '1990-01-01',
        balance: 1000,
      },
      {
        id: 'user-2',
        username: 'user2',
        birthdate: '1995-05-05',
        balance: 500.5,
      },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'user-1',
      username: 'user1',
      birthdate: '1990-01-01',
      balance: '1000',
    });
    expect(result[1].balance).toBe('500.5');
  });

  it('should return empty array when no users exist', async () => {
    mockUserRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
