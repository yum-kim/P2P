import {
  Body,
  Controller,
  Get,
  Post,
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
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { SearchChatDto } from './dto/search-chat.dto';
import { ResponseChatDto } from './dto/response-chat.dto';

@Controller('chat')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({
    summary: '채팅 내역 조회 API',
    description: '채팅 내역 조회 조회',
  })
  @ApiResponse({
    status: 200,
    description: '채팅 내역 조회 조회',
    type: Chat,
    isArray: true,
  })
  @Get('detail')
  async getChatMessage(
    @Query() searchQuery: SearchChatDto,
    @Query('size') size: number,
  ): Promise<[Chat[], number?]> {
    return await this.chatService.getChatMessage(searchQuery, size);
  }

  @ApiOperation({
    summary: '채팅방 리스트 조회',
    description: '채팅방 리스트 조회',
  })
  @ApiResponse({
    status: 200,
    description: '채팅방 리스트 조회',
    type: ResponseChatDto,
    isArray: true,
  })
  @Get('')
  async getChatList(@GetUser() user: User): Promise<ResponseChatDto[]> {
    return await this.chatService.getChatList(user);
  }

  @ApiOperation({
    summary: '메세지 생성 API',
    description: '메세지 생성',
  })
  @ApiCreatedResponse({
    description: '메세지 생성',
    type: Chat,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createChat(
    @Body() createChatDto: CreateChatDto,
    @GetUser() user: User,
  ): Promise<Chat> {
    return this.chatService.createChat(createChatDto, user);
  }
}
