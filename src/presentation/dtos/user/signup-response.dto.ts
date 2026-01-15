import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    example: 'uuid-do-usuario',
    description: 'ID do usuario criado',
  })
  id: string;
}
