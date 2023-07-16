import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/auth/user.entity';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.entity';
import { SearchChatDto } from './dto/search-chat.dto';
import { ResponseChatDto } from './dto/response-chat.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,
    private chatRepository: ChatRepository,
  ) {}

  async getChatMessage(
    { chatUserId, chatUserId2, cursor }: SearchChatDto,
    size: number,
  ): Promise<[Chat[], number?]> {
    const queryBuilder = this.chatRepository
      .createQueryBuilder('chat')
      .where(
        '((chat.sendUserId = :userId1 AND chat.receiveUserId = :userId2) OR (chat.sendUserId = :userId2 AND chat.receiveUserId = :userId1))',
        { userId1: chatUserId, userId2: chatUserId2 },
      )
      .andWhere(cursor ? `chat.id < :cursor` : '1=1', { cursor })
      .take(size)
      .orderBy('chat.createAt', 'DESC');

    const chatMessageList: Chat[] = await queryBuilder.getMany();

    const lastCursor = chatMessageList.length
      ? chatMessageList[chatMessageList.length - 1].id
      : null;

    return [chatMessageList, lastCursor];
  }

  async getChatList(user: User): Promise<ResponseChatDto[]> {
    return await this.authService.getChatList(user);
  }

  async createChat(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    console.log('a');
    return await this.chatRepository.createChat(createChatDto, user);
  }
}
