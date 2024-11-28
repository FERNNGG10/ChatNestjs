"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../messages/messages.service");
let webSocketGateway = class webSocketGateway {
    constructor(jwtService, messageService) {
        this.jwtService = jwtService;
        this.messageService = messageService;
        this.clients = new Map();
    }
    handleConnection(client) {
        try {
            const token = client.handshake.headers['authorization']?.split(' ')[1];
            if (!token) {
                throw new Error('No token provided');
            }
            const user = this.jwtService.verify(token);
            client.data = { user };
            this.clients.set(user.id, client);
            console.log('Client connected: ' + client.id);
        }
        catch (e) {
            console.log('Client disconnected: ' + client.id);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const user = client.data.user;
        if (user) {
            this.clients.delete(user.id);
        }
        console.log('Client disconnected: ' + client.id);
    }
    async handleMessage(message, client) {
        if (typeof message === 'string') {
            message = JSON.parse(message);
        }
        const newmessage = await this.messageService.create(message, client.data.user.id);
        const mappedmessage = await this.messageService.findbymessage(newmessage.id);
        const recipientClient = this.clients.get(message.roomId);
        if (recipientClient) {
            console.log('sending message to recipient', mappedmessage);
            recipientClient.emit('newMessage', mappedmessage);
        }
        console.log('sending message to sender', mappedmessage);
        client.emit('newMessage', mappedmessage);
    }
};
exports.webSocketGateway = webSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], webSocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], webSocketGateway.prototype, "handleMessage", null);
exports.webSocketGateway = webSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, messages_service_1.MessagesService])
], webSocketGateway);
//# sourceMappingURL=websocket.gateway.js.map