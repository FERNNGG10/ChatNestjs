import { Room } from 'src/rooms/entities/room.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    code: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    roomsAsUser1: Room[];
    roomsAsUser2: Room[];
    emailToLowerCase(): Promise<void>;
    encryptPassword(): Promise<void>;
}
