import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuario' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
