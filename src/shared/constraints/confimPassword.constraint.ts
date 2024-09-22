import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'confirmPassword', async: true})
export class confirmPasswordConstraint implements ValidatorConstraintInterface{
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        
        const valuePropertyName= args.object[args.constraints[0]]
        //console.log(args.constraints[0])//lo que se mando de parametro
        // console.log(args.object['password'])//el valor del objeto
        return value === valuePropertyName;
    }
    defaultMessage?(args?: ValidationArguments): string {
       return `This ${args?.property} does not match`
    }

}