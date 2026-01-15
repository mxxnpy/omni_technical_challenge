import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuario unico' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuario (min 6 caracteres)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '1990-01-15', description: 'Data de nascimento' })
  @IsString()
  @IsNotEmpty()
  birthdate: string;
}
