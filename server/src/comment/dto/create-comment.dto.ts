import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 정보' })
  boardId: number;

  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  comment: string;
}
