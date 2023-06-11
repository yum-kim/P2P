import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ description: 'userID' })
  id: number;

  @ApiProperty({ description: 'AccessToken' })
  accessToken: string;

  @ApiProperty({ description: 'username' })
  username: string;

  @ApiProperty({ description: 'profileImagePath' })
  profileImagePath: string;
}
