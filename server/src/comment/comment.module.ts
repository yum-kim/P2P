import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommentRepository]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtService],
})
export class CommentModule {}
