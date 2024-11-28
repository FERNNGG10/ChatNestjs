import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Message } from 'src/messages/entities/message.entity';
import { GoogleUserDto } from './dto/google-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly roomRepository;
    private readonly messageRepository;
    constructor(userRepository: Repository<User>, roomRepository: Repository<Room>, messageRepository: Repository<Message>);
    holamundo(): Promise<string>;
    create(createUserDto: CreateUserDto): Promise<User>;
    createGoogleUser(gooleUserDto: GoogleUserDto): Promise<User>;
    findAll(req: any): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    seeder(): Promise<boolean>;
}
