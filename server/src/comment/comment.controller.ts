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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger/dist';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글 생성 API',
    description: '댓글 생성',
  })
  @ApiCreatedResponse({
    description: '댓글 생성',
    type: Comment,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentDto, user);
  }

  @ApiOperation({
    summary: '댓글 수정 API',
    description: '댓글을 변경한다.',
  })
  @ApiBody({
    schema: {
      properties: {
        comment: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '댓글을 변경한다',
    type: Comment,
  })
  @Put('/:id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('comment') comment: string,
  ): Promise<Comment> {
    return this.commentService.updateComment(id, comment);
  }

  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '댓글 삭제',
  })
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.commentService.deleteComment(id, user);
  }
}
