import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId1:number

    @Column()
    userId2:number

    @Column({nullable:true})
    status:number //0 espera, 1 activo, 2 rechazado

    @ManyToOne(() => User)
    @JoinColumn({name:'userId1'})
    user1: User;

    @ManyToOne(() => User)
    @JoinColumn({name:'userId2'})
    user2: User;

    @OneToMany(()=>Message,(message)=>message.room)
    messages: Message[]
}
