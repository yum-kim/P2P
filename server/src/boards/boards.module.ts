import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
// import { HeartRepository } from 'src/heart/heart.repository';
// import { HeartService } from 'src/heart/heart.service';
import { HeartModule } from 'src/heart/heart.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule,
    HeartModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, JwtService],
})
export class BoardsModule {}
