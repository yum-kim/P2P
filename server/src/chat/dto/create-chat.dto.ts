import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: '채팅 메세지' })
  chatMessage: string;

  @ApiProperty({ description: '메세지 받을 User' })
  receiveUserId: number;
}
