import { IsNumber, IsString } from "class-validator";

export class VerifyCodeDto{
    @IsNumber()
    userId: number;

    @IsString()
    code: string;
}