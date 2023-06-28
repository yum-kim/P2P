import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HeartRepository } from './heart.repository';
import { CreateHeartDto } from './dto/create-heart.dto';
import { User } from 'src/auth/user.entity';
import { Heart } from './heart.entity';
import { BoardHeartTypeEnum } from 'src/boards/board.enum';
import { Board } from 'src/boards/board.entity';

@Injectable()
export class HeartService {
  constructor(private heartRepository: HeartRepository) {}

  async getHeartByBoardUserId(boardId: number, userId: number): Promise<Heart> {
    return await this.heartRepository.findOne({ where: { boardId, userId } });
  }

  async changeHeart(
    createHeartDto: CreateHeartDto,
    user: User,
  ): Promise<Heart | void> {
    if (createHeartDto.heart)
      return await this.createHeart(createHeartDto, user);
    else return await this.deleteHeart(createHeartDto.boardId, user);
  }

  async createHeart(
    createHeartDto: CreateHeartDto,
    user: User,
  ): Promise<Heart> {
    const heart: any = await this.heartRepository.findOne({
      where: { boardId: createHeartDto.boardId, userId: user.id },
    });
    if (heart) throw new BadRequestException(`이미 좋아요를 한 상태 입니다`);
    await this.updateBoardHeart(
      createHeartDto.boardId,
      BoardHeartTypeEnum.increment,
    );
    return await this.heartRepository.createHeart(createHeartDto, user);
  }

  async deleteHeart(id: number, user: User): Promise<void> {
    const query = this.heartRepository.createQueryBuilder('heart');
    const result: any = await query
      .delete()
      .where('board.id = :id', { id })
      .andWhere('userId = :userid', { userid: user.id })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException(`좋아요를 하고 있지 않습니다`);
    await this.updateBoardHeart(id, BoardHeartTypeEnum.decrement);
  }

  async updateBoardHeart(
    boardId: number,
    type: BoardHeartTypeEnum,
  ): Promise<void> {
    let countType: string;
    if (type == BoardHeartTypeEnum.increment) countType = 'heart_count + 1';
    else countType = 'heart_count - 1';
    await this.heartRepository
      .createQueryBuilder()
      .update(Board)
      .where('id = :boardId', { boardId })
      .set({ heartCount: () => countType })
      .execute();
  }
}
