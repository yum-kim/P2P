import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHeartDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 정보' })
  boardId: number;
}
