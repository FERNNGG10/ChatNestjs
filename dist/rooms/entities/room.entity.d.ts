import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";
export declare class Room {
    id: number;
    userId1: number;
    userId2: number;
    status: number;
    user1: User;
    user2: User;
    messages: Message[];
}
