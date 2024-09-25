import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    TypeOrmModule.forFeature([Message,User,Room]),
    RoomsModule
  ],
  exports: [MessagesService], 
})
export class MessagesModule {}