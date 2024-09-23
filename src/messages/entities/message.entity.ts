import { ApiProperty } from "@nestjs/swagger";
import { Entity, ObjectIdColumn,ObjectId, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('messages')
export class Message {
    @ObjectIdColumn()
    @ApiProperty({type:()=>String})
    _id: ObjectId;

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
