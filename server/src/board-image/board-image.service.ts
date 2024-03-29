import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardImageRepository } from './board-image.repository';
import { BoardImage } from './board-image.entity';

@Injectable()
export class BoardImageService {
  constructor(private boardImageRepository: BoardImageRepository) {}
  async getBoardImages(boardId: number): Promise<BoardImage[]> {
    return await this.boardImageRepository.find({
      where: { boardId },
    });
  }
  async createBoardImage(
    files: Express.Multer.File[],
    boardId: number,
  ): Promise<BoardImage[]> {
    const boardImg: BoardImage[] = [];
    if (files.length === 0) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    for (const file of files) {
      boardImg.push(
        await this.boardImageRepository.createBoardImage(file, boardId),
      );
    }
    return boardImg;
  }
}
