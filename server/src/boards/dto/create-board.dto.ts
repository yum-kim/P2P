import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  description: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  readonly files: Express.Multer.File[];
}
