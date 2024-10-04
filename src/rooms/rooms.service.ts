import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ){}
  
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll() {
    return await this.roomRepository.find({
      relations:['user1','user2'],
      select:['id','user1','user2']
    })
  }

  async findOne(id: number) {
    return await this.roomRepository.findOneOrFail({
      where:{id:id},
      relations:['user1','user2'],
      select:['id','user1','user2']
    })
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
