import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { EntityManager } from "typeorm";
export declare class existConstraint implements ValidatorConstraintInterface {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args?: ValidationArguments): Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
