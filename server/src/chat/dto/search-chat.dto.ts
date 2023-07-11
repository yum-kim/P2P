import { ApiProperty } from '@nestjs/swagger';

export class SearchChatDto {
  @ApiProperty({
    description: '채팅 유저 ID',
  })
  readonly chatUserId: number;

  @ApiProperty({
    description: '채팅 유저 ID2',
  })
  readonly chatUserId2: number;

  @ApiProperty({
    description: '채팅방 커서',
    required: false,
  })
  readonly cursor?: number;
}
