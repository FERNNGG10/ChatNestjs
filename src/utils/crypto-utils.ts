import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const encryptMessage = (message: string): string => {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

export const decryptMessage = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};