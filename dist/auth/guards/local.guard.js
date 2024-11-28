"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    canActivate(context) {
        console.log('inside local guard');
        return super.canActivate(context);
    }
}
exports.LocalAuthGuard = LocalAuthGuard;
//# sourceMappingURL=local.guard.js.map