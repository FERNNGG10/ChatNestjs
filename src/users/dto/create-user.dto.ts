import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ConfirmPassword } from 'src/shared/validators/confirmPassword.validator';
import { IsUnique } from 'src/shared/validators/isUnique.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ConfirmPassword('passwordConfirmation')
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  passwordConfirmation: string;
  
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @IsUnique({ table: 'users', column: 'email' })
  email: string;
}
