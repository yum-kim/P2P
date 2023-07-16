import { ApiProperty } from '@nestjs/swagger';

export class ResponseChatDto {
  @ApiProperty({ description: '채팅 내용 id' })
  id: string;
  @ApiProperty({ description: '유저 코드' })
  usercode: string;
  @ApiProperty({ description: '유저 명' })
  username: string;
  @ApiProperty({ description: '메세지 내용' })
  chat_message: string;
  @ApiProperty({ description: '생성 일자' })
  created_at: string;
  @ApiProperty({ description: '유저 프로필 이미지' })
  profile_image_path: string;
}
