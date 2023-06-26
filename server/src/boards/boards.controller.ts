import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBody, ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger/dist';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validataion.pipe';
import { SearchBoardDto } from './dto/search-board.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ResponseCreateBoardDto } from './dto/response-create-board.dtoy';
import { ResponseBoardDto } from './dto/response-board.dto';

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
    type: ResponseBoardDto,
    isArray: true,
  })
  @Get('')
  async getAllBoards(
    @GetUser() user: User,
    @Query() searchQuery: SearchBoardDto,
    @Query('size') size: number,
  ): Promise<[ResponseBoardDto[], number, number?]> {
    return await this.boardService.getAllBoards(searchQuery, size, user);
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
  async getAllBoard(@GetUser() user: User): Promise<Board[]> {
    return await this.boardService.getAllBoardByUserId(user);
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
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  @ApiOperation({
    summary: '게시판 생성 API',
    description: '게시판 생성',
  })
  @ApiCreatedResponse({
    description: '게시판 생성',
    type: ResponseCreateBoardDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFiles() files: Express.Multer.File[],
    @GetUser() user: User,
  ): Promise<ResponseCreateBoardDto> {
    return await this.boardService.createBoard(createBoardDto, files, user);
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
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardService.updateBoardStatus(id, status);
  }

  @ApiOperation({
    summary: '게시판 수정 API',
    description: '게시판 수정',
  })
  @ApiBody({
    schema: {
      properties: {
        description: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '게시판 수정',
    type: Board,
  })
  @Put('/:id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, description);
  }

  @ApiOperation({
    summary: '게시판 삭제 API',
    description: '게시판 삭제',
  })
  @Delete('/:id')
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.boardService.deleteBoard(id, user);
  }
}
