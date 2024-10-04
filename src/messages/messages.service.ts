import { Injectable, Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { encryptMessage, decryptMessage } from 'src/utils/crypto-utils';


@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ){}

  async create(createMessageDto: CreateMessageDto, userId: number) {
    const room = await this.roomRepository.create({
      userId1: userId,
      userId2: createMessageDto.roomId
    });
    await this.roomRepository.save(room);

    const encryptedMessage = encryptMessage(createMessageDto.message);
    const message = await this.messageRepository.create({
      message: encryptedMessage,
      roomId: room.id
    });
    return await this.messageRepository.save(message);
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages.map(message => ({
      ...message,
      message: decryptMessage(message.message)
    }));
  }

  async findOne(id: number, userId: number) {
      const messages = await this.messageRepository.find({
          relations: ['room', 'room.user1', 'room.user2'],
          where: [
              { room: { userId1: userId, userId2: id } },
              { room: { userId1: id, userId2: userId } }
          ],
      });
      return messages.map(message => {
          return {
              id: message.id,
              message: decryptMessage(message.message),
              roomId: message.roomId,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt,
              deletedAt: message.deletedAt,
              user1: message.room.user1,
              user2: message.room.user2
          };
      });
  }

  async findbymessage(id: number) {
    const message = await this.messageRepository.findOne({
      relations: ['room', 'room.user1', 'room.user2'],
      where: { id: id },
    });
  
    if (!message) {
      throw new Error('Message not found');
    }
  
    return {
      id: message.id,
      message: decryptMessage(message.message),
      roomId: message.roomId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      deletedAt: message.deletedAt,
      user1: message.room.user1,
      user2: message.room.user2,
    };
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}