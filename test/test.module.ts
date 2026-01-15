import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/domain/entities/user.entity';
import { Transaction } from '../src/domain/entities/transaction.entity';
import { UserModule } from '../src/modules/user/user.module';
import { TransferModule } from '../src/modules/transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'omni_challenge',
      entities: [User, Transaction],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([User, Transaction]),
    UserModule,
    TransferModule,
  ],
})
export class TestModule {}
