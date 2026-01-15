import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({ example: 'uuid-do-remetente', description: 'ID do usuario remetente' })
  @IsString()
  @IsNotEmpty()
  fromId: string;

  @ApiProperty({ example: 'uuid-do-destinatario', description: 'ID do usuario destinatario' })
  @IsString()
  @IsNotEmpty()
  toId: string;

  @ApiProperty({ example: 100.50, description: 'Valor a ser transferido' })
  @IsNumber()
  @IsPositive()
  amount: number;
}
