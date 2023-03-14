import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '댓글 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '내용', name: 'comment_memo' })
  commentMemo: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;

  @ManyToOne((type) => User, { eager: false })
  user: User;

  @ManyToOne((type) => Board, (board) => board.comments, { eager: false })
  board: Board;
}
