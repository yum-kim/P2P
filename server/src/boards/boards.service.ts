import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Like } from 'typeorm';
import { SearchBoardDto } from './dto/search-board.dto';
import { HeartService } from 'src/heart/heart.service';

@Injectable()
export class BoardsService {
  constructor(
    private boardRepository: BoardRepository,
    private heartService: HeartService,
  ) {}

  async getAllBoards(
    { description, sortColumn, orderby }: SearchBoardDto,
    page: number,
    size: number,
  ): Promise<[Board[], number]> {
    let descriptionOption: any;
    if (description) descriptionOption = Like(description);

    const boardAndCount: any = await this.boardRepository.findAndCount({
      where: {
        description: descriptionOption,
      },
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
      relations: ['user', 'comment', 'comment.user'],
    });

    boardAndCount[0] = await Promise.all(
      boardAndCount[0].map(async (x) => {
        x.heart = !!(await this.heartService.getHeartByBoardUserId(
          x.id,
          x.user.id,
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

    if (!boardData) throw new NotFoundException(`Can not find Board`);
    return boardData;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const boardData: Board = await this.getBoardById(id);
    boardData.status = status;
    await this.boardRepository.save(boardData);
    return boardData;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const query = this.boardRepository.createQueryBuilder('board');
    const result: any = await query
      .delete()
      .where('board.id = :id', { id })
      .andWhere('userUserid = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException(`Can not find Board`);
  }
}
