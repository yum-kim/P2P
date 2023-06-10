import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Board } from 'src/boards/board.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 정보' })
  boardId: Board;

  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  comment: string;
}
