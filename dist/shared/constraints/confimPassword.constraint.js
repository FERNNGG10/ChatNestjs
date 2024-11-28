"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordConstraint = void 0;
const class_validator_1 = require("class-validator");
let confirmPasswordConstraint = class confirmPasswordConstraint {
    async validate(value, args) {
        const valuePropertyName = args.object[args.constraints[0]];
        return value === valuePropertyName;
    }
    defaultMessage(args) {
        return `This ${args?.property} does not match`;
    }
};
exports.confirmPasswordConstraint = confirmPasswordConstraint;
exports.confirmPasswordConstraint = confirmPasswordConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'confirmPassword', async: true })
], confirmPasswordConstraint);
//# sourceMappingURL=confimPassword.constraint.js.map