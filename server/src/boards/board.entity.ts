import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
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

  @Column({ nullable: true })
  @ApiProperty({ description: '이미지 경로' })
  imagePath: string;

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
}
