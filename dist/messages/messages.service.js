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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./entities/message.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
const crypto_utils_1 = require("../utils/crypto-utils");
let MessagesService = class MessagesService {
    constructor(messageRepository, userRepository, roomRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }
    async create(createMessageDto, userId) {
        const room = await this.roomRepository.create({
            userId1: userId,
            userId2: createMessageDto.roomId
        });
        await this.roomRepository.save(room);
        const encryptedMessage = (0, crypto_utils_1.encryptMessage)(createMessageDto.message);
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
            message: (0, crypto_utils_1.decryptMessage)(message.message)
        }));
    }
    async findOne(id, userId) {
        const messages = await this.messageRepository.find({
            relations: ['room', 'room.user1', 'room.user2'],
            where: [
                { room: { userId1: userId, userId2: id } },
                { room: { userId1: id, userId2: userId } }
            ],
            order: {
                createdAt: 'ASC'
            }
        });
        return messages.map(message => {
            return {
                id: message.id,
                message: message.message,
                roomId: message.roomId,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
                deletedAt: message.deletedAt,
                user1: message.room.user1,
                user2: message.room.user2
            };
        });
    }
    async LastMessage(id, userId) {
        const message = await this.messageRepository.findOne({
            relations: ['room', 'room.user1', 'room.user2'],
            where: [
                { room: { userId1: userId, userId2: id } },
                { room: { userId1: id, userId2: userId } }
            ],
            order: {
                createdAt: 'DESC'
            }
        });
        if (!message) {
            throw new Error('Message not found');
        }
        return {
            id: message.id,
            message: message.message,
            roomId: message.roomId,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            deletedAt: message.deletedAt,
            user1: message.room.user1,
            user2: message.room.user2
        };
    }
    async findbymessage(id) {
        const message = await this.messageRepository.findOne({
            relations: ['room', 'room.user1', 'room.user2'],
            where: { id: id },
        });
        if (!message) {
            throw new Error('Message not found');
        }
        return {
            id: message.id,
            message: message.message,
            roomId: message.roomId,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            deletedAt: message.deletedAt,
            user1: message.room.user1,
            user2: message.room.user2,
        };
    }
    update(id, updateMessageDto) {
        return `This action updates a #${id} message`;
    }
    remove(id) {
        return `This action removes a #${id} message`;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map