import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Heart } from './heart.entity';
import { CreateHeartDto } from './dto/create-heart.dto';

@CustomRepository(Heart)
export class HeartRepository extends Repository<Heart> {
  async createHeart(
    createHeartDto: CreateHeartDto,
    user: User,
  ): Promise<Heart> {
    const { boardId } = createHeartDto;

    const heart = this.create({
      boardId,
      userId: user.id,
    });
    await this.save(heart);
    return heart;
  }
}
