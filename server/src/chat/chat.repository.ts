import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@CustomRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  async createChat(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    const { chatMessage, receiveUserId } = createChatDto;

    const chat = this.create({
      chatMessage,
      receiveUserId,
      sendUserId: user.id,
    });
    await this.save(chat);
    return chat;
  }
}
