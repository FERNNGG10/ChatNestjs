import { registerDecorator,ValidationOptions } from "class-validator";
import { isUniqueConstraint } from "../constraints/isUnique.constraint";

export type IsUniqueConstraintInput ={
    table:string,
    column:string 
}

export function IsUnique(
    options: IsUniqueConstraintInput,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'isUnique',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [options],
        validator: isUniqueConstraint,
      });
    };
  }
  