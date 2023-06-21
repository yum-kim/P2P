import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardImage } from './board-image.entity';

@CustomRepository(BoardImage)
export class BoardImageRepository extends Repository<BoardImage> {
  async createBoardImage(file: any, boardId: number): Promise<BoardImage> {
    const { location, key } = file.transforms[0];

    const boardImage = this.create({
      imagePath: location,
      imageName: key,
      boardId,
    });
    return await this.save(boardImage);
  }
}
