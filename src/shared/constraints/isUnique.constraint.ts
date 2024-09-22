import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqueConstraintInput } from '../validators/isUnique.validator';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class isUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { table, column }: IsUniqueConstraintInput = args.constraints[0];
    const valuetocheck = value ? value.toString().toLowerCase() : value;
    const result = await this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .where({ [column]: valuetocheck })
      .getOne();
    // console.log(table)
    // console.log(column);
    // console.log(result);
    return result ? false : true;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `This ${args?.property} already taken`;
  }
}
