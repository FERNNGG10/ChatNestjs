import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';
export declare class isUniqueConstraint implements ValidatorConstraintInterface {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args?: ValidationArguments): Promise<boolean>;
    defaultMessage?(args?: ValidationArguments): string;
}
