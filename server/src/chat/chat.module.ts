import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ChatRepository } from './chat.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ChatRepository]), AuthModule],
  controllers: [ChatController],
  providers: [ChatService, JwtService],
})
export class ChatModule {}
