import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게시판 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '제목' })
  title: string;

  @Column()
  @ApiProperty({ description: '내용' })
  description: string;

  @Column()
  @ApiProperty({ description: '상태' })
  status: BoardStatus;

  @Column()
  @ApiProperty({ description: '조회수' })
  hit: number;

  @Column()
  @ApiProperty({ description: '이미지 경로' })
  imagePath: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;

  @ManyToOne((type) => User, (user) => user.boards, { eager: true })
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.board, { eager: true })
  comments: Comment[];
}
