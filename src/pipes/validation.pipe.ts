import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation-exception";

@Injectable()
export class ValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {
            const obj = plainToClass(metadata.metatype, value);

            const errors = await validate(obj);


            if (errors.length) {
                const messages = errors.map(error => {
                    const key = error.property;
                    const value = Object.values(error.constraints)
                    return {[key]: value};
                });
                throw new ValidationException(messages);
            }
            return value;
        } catch (e) {
            console.log(e);
        }


    }

}