import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserNotificationRepository } from './user-notification.repository';
import { UserNotification } from './user-notification.entity';

@Injectable()
export class UserNotificationService {
  constructor(private userNotificationRepository: UserNotificationRepository) {}

  async getNotificationTotalCount(user: User): Promise<number> {
    const result = await this.userNotificationRepository
      .createQueryBuilder('notification')
      .select('SUM(notification.noticount)', 'sum')
      .where('notification.receiveUserId = :userId', { userId: user.id })
      .getRawOne();

    return result.sum;
  }

  async updateNotiCount(user: User, sendUserId: number): Promise<boolean> {
    const queryBuilder = this.userNotificationRepository
      .createQueryBuilder('notification')
      .update(UserNotification)
      .set({ noticount: 0 })
      .where('receiveUserId = :receiveUserId', { receiveUserId: user.id });

    if (sendUserId !== undefined) {
      queryBuilder.andWhere('sendUserId = :sendUserId', { sendUserId });
    }

    await queryBuilder.execute();

    return true;
  }
}
