"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPassword = ConfirmPassword;
const class_validator_1 = require("class-validator");
const confimPassword_constraint_1 = require("../constraints/confimPassword.constraint");
function ConfirmPassword(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'passwordConfirmation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: confimPassword_constraint_1.confirmPasswordConstraint
        });
    };
}
//# sourceMappingURL=confirmPassword.validator.js.map