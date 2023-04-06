import { IsString, IsNumber} from "class-validator";

export class AddBanDto {
    @IsString({message: "Ban reason must be string"})
    reason: string
    @IsNumber( {}, {message: "User id must be number"})
    userId: number
}