"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptMessage = exports.encryptMessage = void 0;
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
};
exports.encryptMessage = encryptMessage;
const decryptMessage = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
exports.decryptMessage = decryptMessage;
//# sourceMappingURL=crypto-utils.js.map