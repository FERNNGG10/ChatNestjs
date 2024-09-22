import { Injectable, Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(Message, 'mongodbconnection')
    private messageRepository: Repository<Message>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async create(createMessageDto: CreateMessageDto, userId: number) {
    const message = await this.messageRepository.create({
      ...createMessageDto,
      userId
    });
    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: number) {
    return await this.messageRepository.find({where:{roomId:id}});
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
