"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const isUnique_constraint_1 = require("../../shared/constraints/isUnique.constraint");
const message_entity_1 = require("../../messages/entities/message.entity");
const exist_constraint_1 = require("../../shared/constraints/exist.constraint");
const room_entity_1 = require("../../rooms/entities/room.entity");
let TypeormModule = class TypeormModule {
};
exports.TypeormModule = TypeormModule;
exports.TypeormModule = TypeormModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    synchronize: true,
                    entities: [user_entity_1.User, message_entity_1.Message, room_entity_1.Room],
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, message_entity_1.Message, room_entity_1.Room]),
        ],
        providers: [isUnique_constraint_1.isUniqueConstraint, exist_constraint_1.existConstraint],
        exports: [isUnique_constraint_1.isUniqueConstraint, exist_constraint_1.existConstraint],
    })
], TypeormModule);
//# sourceMappingURL=typeorm.module.js.map