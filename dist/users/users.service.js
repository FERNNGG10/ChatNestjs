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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../rooms/entities/room.entity");
const message_entity_1 = require("../messages/entities/message.entity");
let UsersService = class UsersService {
    constructor(userRepository, roomRepository, messageRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }
    async holamundo() {
        return 'Hola mundo';
    }
    async create(createUserDto) {
        const user = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }
    async createGoogleUser(gooleUserDto) {
        const user = await this.userRepository.create(gooleUserDto);
        return await this.userRepository.save(user);
    }
    async findAll(req) {
        const user = req.user.id;
        return await this.userRepository.find({ where: { id: (0, typeorm_2.Not)(user) } });
    }
    async findOne(id) {
        return await this.userRepository.findOneOrFail({ where: { id } });
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneOrFail({ where: { id } });
        await this.userRepository.merge(user, updateUserDto);
        return await this.userRepository.save(user);
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOneOrFail({ where: { email } });
    }
    async remove(id) {
        await this.userRepository.findOneOrFail({ where: { id } });
        return await this.userRepository.softDelete(id);
    }
    async seeder() {
        const users = [
            { email: 'miguelvillalpando19@gmail.com', password: 'password1', username: 'user1' },
            { email: 'edsonalgarate@gmail.com', password: 'password2', username: 'user2' },
        ];
        const rooms = [
            { userId1: 1, userId2: 2, status: 1 },
            { userId1: 2, userId2: 1, status: 1 },
        ];
        const messages = [
            { message: 'Hello from user1 to user2', roomId: 1 },
            { message: 'Hello from user1 to user3', roomId: 2 },
        ];
        for (const user of users) {
            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);
        }
        for (const room of rooms) {
            const newRoom = this.roomRepository.create(room);
            await this.roomRepository.save(newRoom);
        }
        for (const message of messages) {
            const newMessage = this.messageRepository.create(message);
            await this.messageRepository.save(newMessage);
        }
        return true;
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "findAll", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(2, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map