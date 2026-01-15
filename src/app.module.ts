import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './modules/user/user.module';
import { TransferModule } from './modules/transfer/transfer.module';

@Module({
  imports: [DatabaseModule, UserModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
