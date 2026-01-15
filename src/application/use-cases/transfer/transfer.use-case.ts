import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../../../domain/entities/transaction.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.interface';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../../../domain/repositories/transaction.repository.interface';
import { ERROR_MESSAGES } from '../../../shared/constants';

export interface TransferInput {
  fromId: string;
  toId: string;
  amount: number;
}

@Injectable()
export class TransferUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(input: TransferInput): Promise<void> {
    if (input.amount <= 0) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_AMOUNT);
    }

    if (input.fromId === input.toId) {
      throw new BadRequestException(ERROR_MESSAGES.SELF_TRANSFER);
    }

    const fromUser = await this.userRepository.findById(input.fromId);
    if (!fromUser) {
      throw new NotFoundException(ERROR_MESSAGES.SENDER_NOT_FOUND);
    }

    const toUser = await this.userRepository.findById(input.toId);
    if (!toUser) {
      throw new NotFoundException(ERROR_MESSAGES.RECEIVER_NOT_FOUND);
    }

    if (Number(fromUser.balance) < input.amount) {
      throw new BadRequestException(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
    }

    fromUser.balance = Number(fromUser.balance) - input.amount;
    toUser.balance = Number(toUser.balance) + input.amount;

    await this.userRepository.update(fromUser);
    await this.userRepository.update(toUser);

    const transaction = new Transaction();
    transaction.id = uuidv4();
    transaction.fromId = input.fromId;
    transaction.toId = input.toId;
    transaction.amount = input.amount;

    await this.transactionRepository.create(transaction);
  }
}
