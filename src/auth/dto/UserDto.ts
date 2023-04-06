import {IsEmail, IsString, Length} from "class-validator";

export class UserDto {
    @IsEmail({}, {message: 'Required valid email format'})
    email: string;
    @IsString({message: "Password required to be a string"})
    @Length(4, 10, {message: "Invalid password length"})
    password: string;
}