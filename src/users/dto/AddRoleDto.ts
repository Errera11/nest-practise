import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: "Role must be string"})
    role: string
    @IsNumber({}, {message: "UserId must be number"})
    userId: number
}