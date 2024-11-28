"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EntityNotFoundFilter = class EntityNotFoundFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        return response.status(404).json({
            message: {
                statusCode: 404,
                error: 'Not Found',
                message: 'Resource not found',
            },
        });
    }
};
exports.EntityNotFoundFilter = EntityNotFoundFilter;
exports.EntityNotFoundFilter = EntityNotFoundFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.EntityNotFoundError)
], EntityNotFoundFilter);
//# sourceMappingURL=entity-not-found-exception.filter.js.map