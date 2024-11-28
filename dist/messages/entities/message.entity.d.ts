import { Room } from "src/rooms/entities/room.entity";
export declare class Message {
    id: number;
    message: string;
    roomId: number;
    room: Room;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
