import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-do-usuario', description: 'ID do usuario' })
  id: string;

  @ApiProperty({ example: 'johndoe', description: 'Nome de usuario' })
  username: string;

  @ApiProperty({ example: '1990-01-15', description: 'Data de nascimento' })
  birthdate: string;

  @ApiProperty({ example: '1000.00', description: 'Saldo atual do usuario' })
  balance: string;
}
