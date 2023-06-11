import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { BoardImageController } from './board-image/board-image.controller';
import { BoardImageService } from './board-image/board-image.service';
import { BoardImageModule } from './board-image/board-image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    CommentModule,
    AuthModule,
    BoardImageModule,
  ],
  controllers: [AppController, BoardImageController],
  providers: [AppService, BoardImageService],
})
export class AppModule {}
