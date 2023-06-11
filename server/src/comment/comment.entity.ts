import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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
  @ApiProperty({ description: '내용' })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '수정일자' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
  @Column()
  @ApiProperty({ description: '유저ID' })
  userId: number;

  @ManyToOne(() => Board)
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;
  @Column()
  @ApiProperty({ description: '게시판ID' })
  boardId: number;
}
