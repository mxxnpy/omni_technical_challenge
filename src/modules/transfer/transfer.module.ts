import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { TransferUseCase } from '../../application/use-cases';
import { TransferController } from '../../presentation/controllers/transfer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User])],
  controllers: [TransferController],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    TransferUseCase,
  ],
})
export class TransferModule {}
