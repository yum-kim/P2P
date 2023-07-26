import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserNotificationService } from './user-notification.service';

@Controller('notification')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserNotificationController {
  constructor(private userNotificationService: UserNotificationService) {}

  @ApiOperation({
    summary: '총 알람 조회 API',
    description: '총 알람 조회 ',
  })
  @Get('total-count')
  async getNotificationTotalCount(@GetUser() user: User): Promise<number> {
    return await this.userNotificationService.getNotificationTotalCount(user);
  }

  @ApiOperation({
    summary: '알람 초기화 API',
    description: '알람 초기화',
  })
  @Put('count')
  async updateNotiCount(
    @GetUser() user: User,
    @Body('userId') sendUserId: number,
  ): Promise<boolean> {
    return await this.userNotificationService.updateNotiCount(user, sendUserId);
  }
}
