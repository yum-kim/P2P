import { Module } from '@nestjs/common';
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { HeartRepository } from './heart.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([HeartRepository]), AuthModule],
  controllers: [HeartController],
  providers: [HeartService, JwtService],
  exports: [HeartService],
})
export class HeartModule {}
