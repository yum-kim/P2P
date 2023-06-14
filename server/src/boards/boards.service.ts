import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Like } from 'typeorm';
import { SearchBoardDto } from './dto/search-board.dto';
import { HeartService } from 'src/heart/heart.service';
import { BoardImageService } from 'src/board-image/board-image.service';

@Injectable()
export class BoardsService {
  constructor(
    private boardRepository: BoardRepository,
    private heartService: HeartService,
    private boardImageService: BoardImageService,
  ) {}

  async getAllBoards(
    { description, sortColumn, orderby }: SearchBoardDto,
    page: number,
    size: number,
    user: User,
  ): Promise<[Board[], number]> {
    let where = {};
    if (description) where = { description: Like(`%${description}%`) };

    const boardAndCount: any = await this.boardRepository.findAndCount({
      where,
      order: {
        [sortColumn]: orderby,
      },
      select: {
        user: {
          id: true,
          usercode: true,
          username: true,
          profileImagePath: true,
        },
      },
      skip: (page - 1) * size,
      take: size,
      relations: ['user', 'comment', 'comment.user', 'boardImage'],
    });

    boardAndCount[0] = await Promise.all(
      boardAndCount[0].map(async (x) => {
        x.heart = !!(await this.heartService.getHeartByBoardUserId(
          x.id,
          user.id,
        ));
        return x;
      }),
    );
    return boardAndCount;
  }

  async getAllBoardByUserId(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    const boards: Board[] = await query.getRawMany();

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const boardData: Board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user', 'comment'],
    });

    if (!boardData) throw new NotFoundException(`게시글을 찾을 수 없습니다`);
    return boardData;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    files: Express.Multer.File[],
    user: User,
  ): Promise<Board> {
    const boardData = await this.boardRepository.createBoard(
      createBoardDto,
      user,
    );

    await this.boardImageService.createBoardImage(files, boardData.id);
    return boardData;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const boardData: Board = await this.getBoardById(id);
    boardData.status = status;
    await this.boardRepository.save(boardData);
    return boardData;
  }

  async updateBoard(id: number, description: string): Promise<Board> {
    const boardData = { id, description } as Board;
    await this.boardRepository.save(boardData);
    return boardData;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const query = this.boardRepository.createQueryBuilder('board');
    const result: any = await query
      .delete()
      .where('board.id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException(`삭제할 게시글을 찾을 수 없습니다`);
  }
}
