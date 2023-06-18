import { ApiProperty } from '@nestjs/swagger';
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
export class BoardImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게시판 사진 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '경로' })
  imagePath: string;

  @Column()
  @ApiProperty({ description: '이미지 이름' })
  imageName: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;
  @Column()
  @ApiProperty({ description: '게시판ID' })
  boardId: number;
}
