import { registerDecorator, ValidationOptions } from 'class-validator';
import { existConstraint } from '../constraints/exist.constraint';

export type ExistConstraintInput = {
  table: string;
  column: string;
};

export function Exist(
  options: ExistConstraintInput,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: existConstraint,
    });
  };
}
