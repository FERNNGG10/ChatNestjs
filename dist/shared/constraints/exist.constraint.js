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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let existConstraint = class existConstraint {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async validate(value, args) {
        const { table, column } = args.constraints[0];
        const result = await this.entityManager
            .getRepository(table)
            .createQueryBuilder(table)
            .where({ [column]: value })
            .getOne();
        return result ? true : false;
    }
    defaultMessage(validationArguments) {
        return `This ${validationArguments?.property} does not exist`;
    }
};
exports.existConstraint = existConstraint;
exports.existConstraint = existConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'exist', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], existConstraint);
//# sourceMappingURL=exist.constraint.js.map