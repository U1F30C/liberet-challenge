import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class CURPValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
