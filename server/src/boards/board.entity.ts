import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardStatus } from './board.enum';
import { BoardImage } from 'src/board-image/board-image.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게시판 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '내용' })
  description: string;

  @Column()
  @ApiProperty({ description: '상태' })
  status: BoardStatus;

  @Column()
  @ApiProperty({ description: '조회수' })
  hit: number;

  @Column({ default: 0 })
  @ApiProperty({ description: '좋아요 개수' })
  heartCount: number;

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

  @OneToMany(() => Comment, (comment) => comment.board)
  comment: Comment[];

  @OneToMany(() => BoardImage, (boardImage) => boardImage.board)
  boardImage: BoardImage[];
}
