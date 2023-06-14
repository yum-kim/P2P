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
} from 'typeorm';

@Entity()
export class Heart extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '좋아요 고유 id' })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
  @Column()
  @ApiProperty({ description: '유저ID' })
  userId: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;
  @Column()
  @ApiProperty({ description: '게시판ID' })
  boardId: number;
}
