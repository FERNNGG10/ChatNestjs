import { Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Message } from 'src/messages/entities/message.entity';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ){}

  async holamundo() {
    return 'Hola mundo';
  }


  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async createGoogleUser(gooleUserDto:GoogleUserDto) {
    const user = await this.userRepository.create(gooleUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(@Req() req) {
    const user = req.user.id;
    return await this.userRepository.find({where:{id: Not(user)}});
  }

  async findOne(id: number) {
    return await this.userRepository.findOneOrFail({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({where:{id}});
    await this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneOrFail({where:{email}});
  }

  async remove(id: number) {
    await this.userRepository.findOneOrFail({where:{id}});
    return await this.userRepository.softDelete(id);
  }

  async seeder() {
    const users = [
      { email: 'miguelvillalpando19@gmail.com', password: 'password1', username: 'user1' },
      { email: 'edsonalgarate@gmail.com', password: 'password2', username: 'user2' },
    ];

    const rooms = [
      { userId1: 1, userId2: 2 ,status:1},
      { userId1: 2, userId2: 1 ,status:1},

    ];

    const messages = [
      { message: 'Hello from user1 to user2', roomId: 1 },
      { message: 'Hello from user1 to user3', roomId: 2 },
    ];

    // Insert users
    for (const user of users) {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
    }

    // Insert rooms
    for (const room of rooms) {
      const newRoom = this.roomRepository.create(room);
      await this.roomRepository.save(newRoom);
    }

    // Insert messages
    for (const message of messages) {
      const newMessage = this.messageRepository.create(message);
      await this.messageRepository.save(newMessage);
    }

    return true
  }
}
