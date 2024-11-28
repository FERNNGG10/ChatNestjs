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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const crypto_1 = require("crypto");
const email_service_1 = require("../email/email.service");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(jwtService, usersService, emailService, userRepository) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }
    async validateUser({ email, password }) {
        const user = await this.usersService.findOneByEmail(email);
        const hash = (0, crypto_1.createHash)('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        if (user && user.password === hashedPassword) {
            await this.generateVerificationCode(user.id);
            return { id: user.id, email: user.email };
        }
        return null;
    }
    async googleLogin(userId) {
        await this.generateVerificationCode(userId);
        const user = await this.usersService.findOne(userId);
        return { id: user.id, email: user.email };
    }
    async generateVerificationCode(userId) {
        const user = await this.usersService.findOne(userId);
        if (user) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            user.code = await bcrypt.hash(code, await bcrypt.genSalt());
            await this.usersService.update(user.id, user);
            await this.emailService.sendMail(user.email, 'Your code', {
                name: user.username,
                code: code,
            });
            return true;
        }
        throw new common_1.UnauthorizedException('User not found');
    }
    async verifyCode(userId, code) {
        const user = await this.usersService.findOne(userId);
        if (user && (await bcrypt.compare(code, user.code))) {
            const token = await this.jwtService.signAsync({
                id: user.id,
                email: user.email,
            });
            return { token: token };
        }
        throw new common_1.UnauthorizedException('Invalid Code');
    }
    async register(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async validateGoogleUser(googleUser) {
        const user = await this.userRepository.findOneBy({ email: googleUser.email });
        if (user)
            return user;
        const newUser = await this.userRepository.create(googleUser);
        return await this.userRepository.save(newUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        email_service_1.EmailService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map