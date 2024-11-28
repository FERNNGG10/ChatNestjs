import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<import("./entities/message.entity").Message>;
    findAll(): Promise<{
        message: string;
        id: number;
        roomId: number;
        room: import("../rooms/entities/room.entity").Room;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    LastMessages(id: string, req: any): Promise<{
        id: number;
        message: string;
        roomId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user1: import("../users/entities/user.entity").User;
        user2: import("../users/entities/user.entity").User;
    }>;
    findOne(id: string, req: any): Promise<{
        id: number;
        message: string;
        roomId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user1: import("../users/entities/user.entity").User;
        user2: import("../users/entities/user.entity").User;
    }[]>;
    update(id: string, updateMessageDto: UpdateMessageDto): string;
    remove(id: string): string;
}
