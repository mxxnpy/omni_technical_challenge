import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransferUseCase } from './transfer.use-case';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface';
import { TRANSACTION_REPOSITORY } from '../../../domain/repositories/transaction.repository.interface';

describe('TransferUseCase', () => {
  let useCase: TransferUseCase;
  let mockUserRepository: {
    findById: jest.Mock;
    update: jest.Mock;
  };
  let mockTransactionRepository: {
    create: jest.Mock;
  };

  beforeEach(async () => {
    mockUserRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    mockTransactionRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    useCase = module.get<TransferUseCase>(TransferUseCase);
  });

  it('should transfer money successfully', async () => {
    const fromUser = { id: 'from-id', balance: 1000 };
    const toUser = { id: 'to-id', balance: 500 };

    mockUserRepository.findById
      .mockResolvedValueOnce(fromUser)
      .mockResolvedValueOnce(toUser);
    mockUserRepository.update.mockImplementation((user) =>
      Promise.resolve(user),
    );
    mockTransactionRepository.create.mockImplementation((tx) =>
      Promise.resolve(tx),
    );

    await useCase.execute({
      fromId: 'from-id',
      toId: 'to-id',
      amount: 100,
    });

    expect(mockUserRepository.update).toHaveBeenCalledTimes(2);
    expect(mockTransactionRepository.create).toHaveBeenCalled();
  });

  it('should throw BadRequestException for zero amount', async () => {
    await expect(
      useCase.execute({
        fromId: 'from-id',
        toId: 'to-id',
        amount: 0,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException for negative amount', async () => {
    await expect(
      useCase.execute({
        fromId: 'from-id',
        toId: 'to-id',
        amount: -100,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when transferring to yourself', async () => {
    await expect(
      useCase.execute({
        fromId: 'same-id',
        toId: 'same-id',
        amount: 100,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when sender not found', async () => {
    mockUserRepository.findById.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({
        fromId: 'nonexistent',
        toId: 'to-id',
        amount: 100,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when receiver not found', async () => {
    mockUserRepository.findById
      .mockResolvedValueOnce({ id: 'from-id', balance: 1000 })
      .mockResolvedValueOnce(null);

    await expect(
      useCase.execute({
        fromId: 'from-id',
        toId: 'nonexistent',
        amount: 100,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for insufficient balance', async () => {
    mockUserRepository.findById
      .mockResolvedValueOnce({ id: 'from-id', balance: 50 })
      .mockResolvedValueOnce({ id: 'to-id', balance: 500 });

    await expect(
      useCase.execute({
        fromId: 'from-id',
        toId: 'to-id',
        amount: 100,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
