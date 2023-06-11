import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BoardImageController } from './board-image.controller';
import { BoardImageService } from './board-image.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [BoardImageController],
  providers: [BoardImageService, JwtService],
})
export class BoardImageModule {}
