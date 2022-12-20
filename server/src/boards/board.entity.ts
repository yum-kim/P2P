import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
