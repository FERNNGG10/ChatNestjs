import { Module } from '@nestjs/common';
import { webSocketGateway } from './websocket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [AuthModule, MessagesModule], 
  providers: [webSocketGateway],
})
export class WebSocketModule {}