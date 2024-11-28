"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUserDto = void 0;
const openapi = require("@nestjs/swagger");
class GoogleUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
exports.GoogleUserDto = GoogleUserDto;
//# sourceMappingURL=google-user.dto.js.map