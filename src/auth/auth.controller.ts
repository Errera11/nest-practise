import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {UserDto} from "./dto/UserDto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('/signIn')
    signIn(@Body() dto: UserDto) {
        return this.authService.signIn(dto);
    }


    @Post('/signUp')
    signUp(@Body() dto: UserDto) {
        return this.authService.signUp(dto);
    }
}

