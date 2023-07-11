import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/auth/user.entity';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.entity';
import { SearchChatDto } from './dto/search-chat.dto';
import { ResponseChatDto } from './dto/response-chat.dto';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

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
    const queryBuilder = this.chatRepository
      .createQueryBuilder('chat')
      .select([
        'user.username',
        'user.usercode',
        'chat.send_user_id',
        'chat.receive_user_id',
        'chat.chat_message',
        'chat.created_at',
      ])
      .innerJoin(
        User,
        'user',
        'user.id = chat.send_user_id OR user.id = chat.receive_user_id',
      )
      .where('chat.send_user_id = :userId OR chat.receive_user_id = :userId', {
        userId: user.id,
      })
      .andWhere(
        'chat.id IN (SELECT MAX(sub_chat.id) FROM public.chat sub_chat GROUP BY LEAST(sub_chat.send_user_id, sub_chat.receive_user_id), GREATEST(sub_chat.send_user_id, sub_chat.receive_user_id))',
      )
      .setParameter('userId', user.id);

    const chatMessageList: any = await queryBuilder.getRawMany();

    return chatMessageList;
  }

  async createChat(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    console.log('a');
    return await this.chatRepository.createChat(createChatDto, user);
  }
}
