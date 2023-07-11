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
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '채팅 고유 id' })
  id: number;

  @Column()
  @ApiProperty({ description: '채팅 메세지' })
  chatMessage: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'send_user_id', referencedColumnName: 'id' }])
  sendUser: User;
  @Column()
  @ApiProperty({ description: '보낸 유저ID' })
  sendUserId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'receive_user_id', referencedColumnName: 'id' }])
  receiveUser: User;
  @Column()
  @ApiProperty({ description: '받는 유저ID' })
  receiveUserId: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일자' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '수정일자' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: '삭제일자' })
  deleteAt: Date;
}
