import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getAllBoardByUserId(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userUserid = :userId', { userId: user.userid });

    const boards: Board[] = await query.getMany();

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
      .andWhere('userUserid = :userId', { userId: user.userid })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException(`Can not find Board`);
  }
}
