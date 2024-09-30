import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ConfirmPassword } from 'src/shared/validators/confirmPassword.validator';
import { IsUnique } from 'src/shared/validators/isUnique.validator';

export class GoogleUserDto {

  username: string;
  password: string;
  email: string;
}
