import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { SearchBoardDto } from './dto/search-board.dto';
import { HeartService } from 'src/heart/heart.service';
import { BoardImageService } from 'src/board-image/board-image.service';
import { ResponseCreateBoardDto } from './dto/response-create-board.dtoy';
import { ResponseBoardDto } from './dto/response-board.dto';
import { BoardImage } from 'src/board-image/board-image.entity';
import { delete_image } from 'src/aws/s3.service';

@Injectable()
export class BoardsService {
  constructor(
    private boardRepository: BoardRepository,
    private heartService: HeartService,
    private boardImageService: BoardImageService,
  ) {}

  async getAllBoards(
    { username, description, sortColumn, orderby }: SearchBoardDto,
    page: number,
    size: number,
    user: User,
  ): Promise<[ResponseBoardDto[], number]> {
    const queryBuilder = this.boardRepository
      .createQueryBuilder('board')
      .leftJoin('board.user', 'user')
      .addSelect([
        'user.id',
        'user.usercode',
        'user.username',
        'user.profileImagePath',
      ])
      .leftJoinAndSelect('board.comment', 'comment')
      .leftJoin('comment.user', 'commentUser')
      .addSelect([
        'commentUser.id',
        'commentUser.usercode',
        'commentUser.username',
        'commentUser.profileImagePath',
      ])
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .skip((page - 1) * size)
      .take(size);

    if (description) {
      queryBuilder.where('board.description LIKE :description', {
        description: `%${description}%`,
      });
    }

    if (username) {
      queryBuilder.orWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }

    queryBuilder.orderBy(`board.${sortColumn}`, orderby);

    const boardAndCount: any = await queryBuilder.getManyAndCount();
    console.log(boardAndCount[0]);
    for (const board of boardAndCount[0]) {
      board.comment.sort((a, b) => a.id - b.id);
      board.heart = !!(await this.heartService.getHeartByBoardUserId(
        board.id,
        user.id,
      ));
    }

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
  ): Promise<ResponseCreateBoardDto> {
    const responseData: ResponseCreateBoardDto =
      (await this.boardRepository.createBoard(
        createBoardDto,
        user,
      )) as ResponseCreateBoardDto;

    if (files && files.length > 0) {
      responseData.boardImage = await this.boardImageService.createBoardImage(
        files,
        responseData.id,
      );
    }

    return responseData;
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

    const result: Board = await query
      .select()
      .where('board.id = :id', { id })
      .andWhere('board.userId = :userId', { userId: user.id })
      .getOne();

    if (result) {
      const boardImages: BoardImage[] =
        await this.boardImageService.getBoardImages(result.id);
      for (const image of boardImages) {
        await delete_image(image.imageName);
      }
      await this.boardRepository.delete(result.id);
    } else {
      throw new NotFoundException(`삭제할 게시글을 찾을 수 없습니다`);
    }
  }
}
