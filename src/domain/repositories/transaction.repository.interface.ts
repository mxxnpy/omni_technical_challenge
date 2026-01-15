import { Transaction } from '../entities/transaction.entity';
import { INJECTION_TOKENS } from '../../shared/constants';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
}

export const TRANSACTION_REPOSITORY = INJECTION_TOKENS.TRANSACTION_REPOSITORY;
