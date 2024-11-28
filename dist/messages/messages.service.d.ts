import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
export declare class MessagesService {
    private messageRepository;
    private userRepository;
    private roomRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>, roomRepository: Repository<Room>);
    create(createMessageDto: CreateMessageDto, userId: number): Promise<Message>;
    findAll(): Promise<{
        message: string;
        id: number;
        roomId: number;
        room: Room;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: number, userId: number): Promise<{
        id: number;
        message: string;
        roomId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user1: User;
        user2: User;
    }[]>;
    LastMessage(id: number, userId: number): Promise<{
        id: number;
        message: string;
        roomId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user1: User;
        user2: User;
    }>;
    findbymessage(id: number): Promise<{
        id: number;
        message: string;
        roomId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user1: User;
        user2: User;
    }>;
    update(id: number, updateMessageDto: UpdateMessageDto): string;
    remove(id: number): string;
}
