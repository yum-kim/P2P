import { Logger } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Like } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(
    filter: any,
    sortby: any,
    offset: number,
    limit: number,
  ): Promise<Board[]> {
    const whereObj: any = {};
    if (filter) {
      try {
        filter = JSON.parse(filter);
        if (filter.title) whereObj.title = Like(`%${filter.title}%`);
        if (filter.description)
          whereObj.description = Like(`%${filter.description}%`);
      } catch (e) {
        Logger.error(e);
      }
    }
    return await this.boardRepository.find({
      where: whereObj,
      order: sortby,
      skip: offset,
      take: limit,
    });
  }

  async getAllBoardByUserId(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userUserid = :userId', { userId: user.id });

    const boards: Board[] = await query.getRawMany();

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const boardData: Board = await this.boardRepository.findOne({
      where: { id },
    });

    if (!boardData) throw new NotFoundException(`Can not find Board`);
    return boardData;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
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
