import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
