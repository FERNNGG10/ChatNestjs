import { ValidationOptions } from 'class-validator';
export type ExistConstraintInput = {
    table: string;
    column: string;
};
export declare function Exist(options: ExistConstraintInput, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
