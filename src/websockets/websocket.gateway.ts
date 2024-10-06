import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';


@WebSocketGateway(3002, {
  cors: {
    origin:'*',
    methods: ['GET', 'POST'],
  },
})
@Injectable()
export class webSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients: Map<number,Socket> = new Map()

  constructor(private jwtService: JwtService, private messageService:MessagesService){}

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers['authorization']?.split(' ')[1];
      if (!token) {
        throw new Error('No token provided');
      }
      const user = this.jwtService.verify(token);
      client.data = { user }
      this.clients.set(user.id, client);
      console.log('Client connected: ' + client.id);
      //console.log(client.data);
      //console.log(this.clients)
      
    } catch (e) {
      console.log('Client disconnected: ' + client.id);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user) {
      this.clients.delete(user.id); 
    }
    console.log('Client disconnected: ' + client.id);
    //console.log(this.clients)
  }


  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    // console.log(client.data.user.id)
    
    // console.log(message)
    // console.log(message.message)
    if (typeof message === 'string') {
      message = JSON.parse(message);
    }
    // console.log(message.message)
    // console.log(message.roomId) 
    const newmessage=await this.messageService.create(message,client.data.user.id);
    //console.log(await this.messageService.findbymessage(newmessage.id))
    const mappedmessage = await this.messageService.findbymessage(newmessage.id);
    //console.log(this.clients.get(message.roomId))
    //console.log(newmessage)
    const recipientClient = this.clients.get(message.roomId);
    // console.log(recipientClient)
    // console.log('sending message to recipient', this.clients.get(message.roomId));
    if (recipientClient) {
      console.log('sending message to recipient', mappedmessage);
      recipientClient.emit('newMessage',mappedmessage);
    }
    client.emit('newMessage',mappedmessage);
  }
}
