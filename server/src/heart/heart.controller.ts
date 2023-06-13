import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Delete,
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
    summary: '좋아요 등록 API',
    description: '댓글 생성',
  })
  @ApiCreatedResponse({
    description: '좋아요 등록',
    type: Heart,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createHeart(
    @Body() createHeartDto: CreateHeartDto,
    @GetUser() user: User,
  ): Promise<Heart> {
    return this.heartService.createHeart(createHeartDto, user);
  }

  @ApiOperation({
    summary: '좋아요 삭제 API',
    description: '좋아요 삭제',
  })
  @Delete('/:id')
  deleteHeart(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.heartService.deleteHeart(id, user);
  }
}
