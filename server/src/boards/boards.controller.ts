import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger/dist';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validataion.pipe';

@Controller('boards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @ApiOperation({
    summary: '게시판 전체 조회 API',
    description: '게시판 전체 조회',
  })
  @ApiResponse({
    status: 200,
    description: '게시판 전체 조회',
    type: Board,
    isArray: true,
  })
  @Get()
  getAllBoards(
    @Query('filter') filter: any,
    @Query('sortby') sortby: any,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Board[]> {
    return this.boardService.getAllBoards(filter, sortby, offset, limit);
  }

  @ApiOperation({
    summary: '유저별 게시판 조회 API',
    description: '유저별 게시판 조회',
  })
  @ApiResponse({
    status: 200,
    description: '유저별 게시판 조회',
    type: Board,
    isArray: true,
  })
  @Get('/user')
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllBoardByUserId(user);
  }

  @ApiOperation({
    summary: '게시판 ID 조회 API',
    description: '게시판 ID 조회',
  })
  @ApiResponse({
    status: 200,
    description: '게시판 ID 조회',
    type: Board,
  })
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @ApiOperation({
    summary: '게시판 생성 API',
    description: '게시판 생성',
  })
  @ApiCreatedResponse({
    description: '게시판 생성',
    type: Board,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @ApiOperation({
    summary: '게시판 상태 변경 API',
    description: '게시판 상태를 변경한다. (공개모드, 비공개 모드)',
  })
  @ApiBody({
    schema: {
      properties: {
        status: { enum: ['PUBLIC', 'PRIVATE'] },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '게시판 상태를 변경한다',
    type: Board,
  })
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @ApiOperation({
    summary: '게시판 삭제 API',
    description: '게시판 삭제',
  })
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }
}
