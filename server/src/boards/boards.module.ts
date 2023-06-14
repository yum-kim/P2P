import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { HeartModule } from 'src/heart/heart.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/multer.option.factory';
import { BoardImageModule } from 'src/board-image/board-image.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    AuthModule,
    HeartModule,
    BoardImageModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
