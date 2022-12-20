import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  description: string;
}
