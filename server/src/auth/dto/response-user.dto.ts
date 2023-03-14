import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ description: 'userID' })
  userid: number;

  @ApiProperty({ description: 'AccessToken' })
  accessToken: string;
}
