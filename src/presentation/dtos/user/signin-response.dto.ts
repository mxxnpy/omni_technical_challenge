import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    example: 'base64-token',
    description: 'Token de autenticacao',
  })
  token: string;

  @ApiProperty({ example: '1h', description: 'Tempo de expiracao do token' })
  expiresIn: string;
}
