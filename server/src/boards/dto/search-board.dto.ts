import { ApiProperty } from '@nestjs/swagger';
import { BoardSortTypeEnum } from '../board.enum';
import { SortTypeEnum } from 'src/common/common.enum';

export class SearchBoardDto {
  @ApiProperty({
    description: '유저 명',
    required: false,
  })
  readonly username?: string;

  @ApiProperty({
    description: '게시판 내용',
    required: false,
  })
  readonly description?: string;

  @ApiProperty({
    description: '정렬할 데이터 종류',
    default: BoardSortTypeEnum.createAt,
    enum: BoardSortTypeEnum,
    required: false,
  })
  readonly sortColumn?: BoardSortTypeEnum = BoardSortTypeEnum.createAt;

  @ApiProperty({
    description: '오름차순(ASC) / 내림차순(DESC)',
    default: SortTypeEnum.DESC,
    enum: SortTypeEnum,
    required: false,
  })
  readonly orderby?: SortTypeEnum = SortTypeEnum.DESC;
}
