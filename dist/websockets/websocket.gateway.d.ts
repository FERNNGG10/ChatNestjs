import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
export declare class webSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private messageService;
    server: Server;
    private clients;
    constructor(jwtService: JwtService, messageService: MessagesService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(message: any, client: Socket): Promise<void>;
}
