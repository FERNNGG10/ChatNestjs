import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ExistConstraintInput } from "../validators/exist.validator";
import { EntityManager } from "typeorm";

@ValidatorConstraint({ name: 'exist', async: true })
@Injectable()
export class existConstraint implements ValidatorConstraintInterface{

    constructor(private readonly entityManager: EntityManager) {}

    async validate(value: any, args?: ValidationArguments): Promise<boolean>  {
        
        const {table,column}:ExistConstraintInput = args.constraints[0];
        const result = await this.entityManager
            .getRepository(table)
            .createQueryBuilder(table)
            .where({ [column]: value })
            .getOne();
        return result ? true : false;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `This ${validationArguments?.property} does not exist`;
    }

}
