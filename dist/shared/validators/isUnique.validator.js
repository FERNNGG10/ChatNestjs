"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = IsUnique;
const class_validator_1 = require("class-validator");
const isUnique_constraint_1 = require("../constraints/isUnique.constraint");
function IsUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: isUnique_constraint_1.isUniqueConstraint,
        });
    };
}
//# sourceMappingURL=isUnique.validator.js.map