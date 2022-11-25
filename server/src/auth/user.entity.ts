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
  userid: number;

  @Column()
  usercode: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
