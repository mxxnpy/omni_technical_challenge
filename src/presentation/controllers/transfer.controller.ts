import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransferDto } from '../dtos';
import { TransferUseCase } from '../../application/use-cases';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferUseCase: TransferUseCase) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Transferir dinheiro entre usuarios' })
  @ApiResponse({
    status: 204,
    description: 'Transferencia realizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados invalidos ou saldo insuficiente',
  })
  @ApiResponse({ status: 404, description: 'Usuario nao encontrado' })
  transfer(@Body() dto: TransferDto) {
    return this.transferUseCase.execute(dto);
  }
}
