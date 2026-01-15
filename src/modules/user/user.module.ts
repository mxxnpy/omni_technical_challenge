import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import {
  SignUpUseCase,
  SignInUseCase,
  GetAllUsersUseCase,
} from '../../application/use-cases';
import { UserController } from '../../presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    SignUpUseCase,
    SignInUseCase,
    GetAllUsersUseCase,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
