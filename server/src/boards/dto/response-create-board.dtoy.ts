import { ApiProperty } from '@nestjs/swagger';
import { BoardImage } from 'src/board-image/board-image.entity';
import { BoardStatus } from '../board.enum';

export class ResponseCreateBoardDto {
  @ApiProperty({ description: '게시판 고유 id' })
  id: number;

  @ApiProperty({ description: '내용' })
  description: string;

  @ApiProperty({ description: '상태' })
  status: BoardStatus;

  @ApiProperty({ description: '조회수' })
  hit: number;

  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @ApiProperty({ description: '수정일자' })
  updatedAt: Date;

  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;

  @ApiProperty({ description: 'boardImage 정보' })
  boardImage?: BoardImage[];
}
