import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  create(transaction: Transaction): Promise<Transaction> {
    return this.repository.save(transaction);
  }

  findByUserId(userId: string): Promise<Transaction[]> {
    return this.repository.find({
      where: [{ fromId: userId }, { toId: userId }],
    });
  }
}
