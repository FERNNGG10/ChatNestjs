import { Injectable, Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';


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
      userId1:userId,
      userId2:createMessageDto.roomId
    })
    await this.roomRepository.save(room)

    const message = await this.messageRepository.create({
      message:createMessageDto.message,
      roomId:room.id
    });
    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: number, userId: number) {
    const messages = await this.messageRepository.find({
      relations: ['room'],
      where: {
        room: {
          userId1: userId,
          userId2: id,
        },
      },
    });
  
    // Filtrar manualmente los resultados para excluir el objeto `room`
    return messages.map(message => {
      const { room, ...messageWithoutRoom } = message;
      return messageWithoutRoom;
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
