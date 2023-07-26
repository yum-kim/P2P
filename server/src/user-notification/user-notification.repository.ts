import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { UserNotification } from './user-notification.entity';

@CustomRepository(UserNotification)
export class UserNotificationRepository extends Repository<UserNotification> {}
