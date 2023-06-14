import { Module } from '@nestjs/common';
import { BoardImageController } from './board-image.controller';
import { BoardImageService } from './board-image.service';
import { BoardImageRepository } from './board.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardImageRepository])],
  controllers: [BoardImageController],
  providers: [BoardImageService],
  exports: [BoardImageService],
})
export class BoardImageModule {}
