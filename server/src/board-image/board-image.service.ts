import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardImageRepository } from './board.repository';

@Injectable()
export class BoardImageService {
  constructor(private boardImageRepository: BoardImageRepository) {}
  async createBoardImage(files: Express.Multer.File[], boardId: number) {
    if (files.length === 0) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    for (const file of files) {
      await this.boardImageRepository.createBoardImage(file, boardId);
    }
  }
}
