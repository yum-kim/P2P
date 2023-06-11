import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '사용자 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '계정 코드' })
  usercode: string;

  @Column()
  @ApiProperty({ description: '계정' })
  username: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '유저 이미지 url' })
  profileImagePath: string;
}
