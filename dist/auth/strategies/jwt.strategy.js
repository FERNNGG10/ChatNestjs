"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtEstrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
class JwtEstrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jwtsecret8@g',
        });
    }
    validate(payload) {
        return payload;
    }
}
exports.JwtEstrategy = JwtEstrategy;
//# sourceMappingURL=jwt.strategy.js.map