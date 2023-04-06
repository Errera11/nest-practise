
import {IsNumber, IsString} from "class-validator";
export class CreatePostDto {

    userId: number
    @IsString()
    title: string
    @IsString()
    description: string
}