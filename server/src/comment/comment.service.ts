import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    return await this.commentRepository.createComment(createCommentDto, user);
  }

  async updateComment(id: number, comment: string): Promise<Comment> {
    const commentData = { id, comment } as Comment;
    await this.commentRepository.save(commentData);
    return commentData;
  }

  async deleteComment(id: number, user: User): Promise<void> {
    const query = this.commentRepository.createQueryBuilder('comment');
    const result: any = await query
      .delete()
      .where('comment.id = :id', { id })
      .andWhere('userId = :userid', { userid: user.id })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException(`삭제할 댓글을 찾을 수 없습니다`);
  }
}
