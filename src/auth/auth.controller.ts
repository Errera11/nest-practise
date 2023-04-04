import {Body, Controller, Post} from '@nestjs/common';
import {UserDto} from "./dto/UserDto";
import {AuthService} from "./auth.service";

@Controller('')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signIn')
    signIn(@Body() dto: UserDto) {
        return this.authService.signIn(dto);
    }

    @Post('/signUp')
    signUp(@Body() dto: UserDto) {
        return this.authService.signUp(dto);
    }
}

