import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '사용자 고유 id' })
  userid: number;

  @Column()
  @ApiProperty({ description: '계정 코드' })
  usercode: string;

  @Column()
  @ApiProperty({ description: '계정' })
  username: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column()
  @ApiProperty({ description: '유저 이미지 url' })
  profileImagePath: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: false })
  boards: Board[];
}
