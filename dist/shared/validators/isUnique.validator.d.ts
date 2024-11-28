import { ValidationOptions } from "class-validator";
export type IsUniqueConstraintInput = {
    table: string;
    column: string;
};
export declare function IsUnique(options: IsUniqueConstraintInput, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
