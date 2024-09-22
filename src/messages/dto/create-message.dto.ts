import { IsNotEmpty, IsNumber } from "class-validator";
import { Exist } from "src/shared/validators/exist.validator";

export class CreateMessageDto {

    @IsNotEmpty()
    message: string;

    
    @Exist({table:'users',column:'id'})
    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}
