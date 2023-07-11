import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { BoardImage } from 'src/board-image/board-image.entity';

export class ResponseChatDto {
  @ApiProperty({ description: '채팅 내용 id' })
  chat_message: string;
  @ApiProperty({ description: '유저 코드' })
  user_usercode: string;
  @ApiProperty({ description: '유저 명' })
  user_username: string;
  @ApiProperty({ description: '보낸 사람 id' })
  send_user_id: string;
  @ApiProperty({ description: '받는 사람 id' })
  receive_user_id: string;
  @ApiProperty({ description: '생성 일자' })
  created_at: string;
}
