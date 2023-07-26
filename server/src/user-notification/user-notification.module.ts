import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserNotificationController } from './user-notification.controller';
import { UserNotificationRepository } from './user-notification.repository';
import { UserNotificationService } from './user-notification.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserNotificationRepository]),
    AuthModule,
  ],
  controllers: [UserNotificationController],
  providers: [UserNotificationService, JwtService],
})
export class UserNotificationModule {}
