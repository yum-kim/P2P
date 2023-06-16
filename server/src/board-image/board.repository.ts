import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardImage } from './board-image.entity';

@CustomRepository(BoardImage)
export class BoardImageRepository extends Repository<BoardImage> {
  async createBoardImage(
    file: Express.Multer.File,
    boardId: number,
  ): Promise<BoardImage> {
    const { path } = file;

    const boardImage = this.create({
      imagePath: path,
      boardId,
    });
    return await this.save(boardImage);
  }
}
