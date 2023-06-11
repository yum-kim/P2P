import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { boardId, comment } = createCommentDto;

    const comments = this.create({
<<<<<<< HEAD
      boardId,
      comment,
      userId: user.id,
=======
      board: boardId,
      comment,
      user,
>>>>>>> a31a37a7b20b9504fc1a50a3e8abf17ebaad1d6d
    });
    await this.save(comments);
    return comments;
  }
}
