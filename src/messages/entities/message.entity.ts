import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/rooms/entities/room.entity";
import { Entity, ObjectIdColumn,ObjectId, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    message: string;

    @Column()
    roomId:number

    @ManyToOne(()=>Room,(room)=>room.messages )
    room:Room

    @CreateDateColumn({type:'date'})
    createdAt: Date;

    @UpdateDateColumn({type:'date'})
    updatedAt: Date;

    @DeleteDateColumn({type:'date'})
    deletedAt: Date;
    
}
