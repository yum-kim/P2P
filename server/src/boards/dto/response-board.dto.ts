import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from '../board.enum';
import { User } from 'src/auth/user.entity';

export class ResponseBoardDto {
  @ApiProperty({ description: '게시판 고유 id' })
  id: number;

  @ApiProperty({ description: '내용' })
  description: string;

  @ApiProperty({ description: '상태' })
  status: BoardStatus;

  @ApiProperty({ description: '조회수' })
  hit: number;

  @ApiProperty({ description: '이미지 경로' })
  imagePath: string;

  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @ApiProperty({ description: '수정일자' })
  updatedAt: Date;

  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;

  @ApiProperty({ description: 'User 정보' })
  user: User;

  @ApiProperty({ description: 'Comment 정보' })
  comment: Comment[];
}
