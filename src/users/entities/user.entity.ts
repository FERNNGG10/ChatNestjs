import { Exclude } from 'class-transformer';
import * as bycrypt from 'bcrypt';
import { createHash } from 'crypto';
import { Room } from 'src/rooms/entities/room.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Exclude()
  @Column({ nullable: true })
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Room, room => room.user1)
  roomsAsUser1: Room[];

  @OneToMany(() => Room, room => room.user2)
  roomsAsUser2: Room[];

  @BeforeInsert()
  @BeforeUpdate()
  async emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async encryptPassword() {
    const hash = createHash('sha256');
    hash.update(this.password);
    this.password = hash.digest('hex');
  }

}