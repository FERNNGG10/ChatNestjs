import { ApiProperty } from "@nestjs/swagger";
import { Entity, ObjectIdColumn,ObjectId, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    message: string;

    @Column()
    userId: number;

    @Column()
    roomId: number;

    @CreateDateColumn({type:'date'})
    createdAt: Date;

    @UpdateDateColumn({type:'date'})
    updatedAt: Date;

    @DeleteDateColumn({type:'date'})
    deletedAt: Date;
    
}
