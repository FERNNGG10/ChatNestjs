import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
export declare class RoomsService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<Room>);
    create(createRoomDto: CreateRoomDto): string;
    findAll(): Promise<Room[]>;
    findOne(id: number): Promise<Room>;
    update(id: number, updateRoomDto: UpdateRoomDto): string;
    remove(id: number): string;
}
