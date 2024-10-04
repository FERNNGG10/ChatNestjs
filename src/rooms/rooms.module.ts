import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from './entities/room.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports:[TypeOrmModule.forFeature([Message,Room])],
  exports:[RoomsService]
})
export class RoomsModule {}
