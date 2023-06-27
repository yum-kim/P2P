import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @ApiOperation({
    summary: '회원 정보 수정',
    description: '회원 정보 수정',
  })
  @Put('')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.authService.updateUser(updateUserDto, file, user);
  }

  @ApiOperation({
    summary: '프로필 이미지 초기화',
    description: '프로필 이미지 초기화',
  })
  @Patch('/user/profile')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async deleteUserProfile(@GetUser() user: User): Promise<User> {
    return await this.authService.deleteUserProfile(user);
  }

  @ApiOperation({
    summary: '회원 탈퇴',
    description: '회원 탈퇴',
  })
  @Delete('')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@GetUser() user: User): Promise<void> {
    return await this.authService.deleteUser(user);
  }
}
