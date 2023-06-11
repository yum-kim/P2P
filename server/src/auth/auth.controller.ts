import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입 API', description: '회원가입' })
  @ApiCreatedResponse({
    description: '회원가입',
    type: User,
  })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<any> {
    return this.authService.signUp(authCredentialDto);
  }

  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  @ApiCreatedResponse({
    description: '로그인',
    content: {
      'application/json': {
        example: {
          accessToken: 'string',
          id: 'number',
          username: 'string',
          profileImagePath: 'string',
        },
      },
    },
  })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<ResponseUserDto> {
    return this.authService.signIn(authCredentialDto);
  }
}
