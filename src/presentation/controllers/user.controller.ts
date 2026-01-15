import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  SignUpDto,
  SignInDto,
  SignUpResponseDto,
  SignInResponseDto,
  UserResponseDto,
} from '../dtos';
import {
  SignUpUseCase,
  SignInUseCase,
  GetAllUsersUseCase,
} from '../../application/use-cases';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar novo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario criado com sucesso', type: SignUpResponseDto })
  @ApiResponse({ status: 409, description: 'Username ja existe' })
  signup(@Body() dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: SignInResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciais invalidas' })
  signin(@Body() dto: SignInDto) {
    return this.signInUseCase.execute(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios retornada com sucesso', type: [UserResponseDto] })
  findAll() {
    return this.getAllUsersUseCase.execute();
  }
}
