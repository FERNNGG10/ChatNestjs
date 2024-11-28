import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class confirmPasswordConstraint implements ValidatorConstraintInterface {
    validate(value: any, args?: ValidationArguments): Promise<boolean>;
    defaultMessage?(args?: ValidationArguments): string;
}
