import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardImage } from './board-image.entity';

@CustomRepository(BoardImage)
export class BoardImageRepository extends Repository<BoardImage> {
  async createBoardImage(
    file: Express.Multer.File,
    boardId: number,
  ): Promise<void> {
    const { path } = file;

    const boardImage = this.create({
      imagePath: path,
      boardId,
    });
    await this.save(boardImage);
  }
}
