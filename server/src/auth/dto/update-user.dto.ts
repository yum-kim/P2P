import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '유저 코드', required: false })
  usercode: string;

  @IsNotEmpty()
  @ApiProperty({ description: '패스워드', required: false })
  password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly file: Express.Multer.File;
}
