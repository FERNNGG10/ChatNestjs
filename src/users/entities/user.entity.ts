import { Exclude } from 'class-transformer';
import { createHash } from 'crypto';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    const hash = createHash('sha256');
    hash.update(this.password);
    this.password = hash.digest('hex');
  }
}
