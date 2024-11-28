"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exist = Exist;
const class_validator_1 = require("class-validator");
const exist_constraint_1 = require("../constraints/exist.constraint");
function Exist(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'exist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: exist_constraint_1.existConstraint,
        });
    };
}
//# sourceMappingURL=exist.validator.js.map