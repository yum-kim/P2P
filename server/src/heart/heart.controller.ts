import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Heart } from './heart.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { HeartService } from './heart.service';
import { CreateHeartDto } from './dto/create-heart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('heart')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class HeartController {
  constructor(private heartService: HeartService) {}
  @ApiOperation({
    summary: '좋아요 등록/삭제 API',
    description: '좋아요 등록/삭제',
  })
  @ApiCreatedResponse({
    description: '좋아요 등록/삭제',
    type: Heart,
  })
  @Post()
  @UsePipes(ValidationPipe)
  async changeHeart(
    @Body() createHeartDto: CreateHeartDto,
    @GetUser() user: User,
  ): Promise<Heart | void> {
    return this.heartService.changeHeart(createHeartDto, user);
  }
}
