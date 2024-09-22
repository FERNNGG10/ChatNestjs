import { registerDecorator, ValidationOptions } from "class-validator";
import { confirmPasswordConstraint } from "../constraints/confimPassword.constraint";

export function ConfirmPassword(options:string, validationOptions?:ValidationOptions){
    return function(object:any, propertyName:string){
        registerDecorator({
            name:'passwordConfirmation',
            target:object.constructor,
            propertyName:propertyName,
            options:validationOptions,
            constraints:[options],
            validator:confirmPasswordConstraint
             
        })
    }
}