import { Controller, Get, Post, Body } from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUserDto";

@Controller('')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get('/users')
    async getAll() {
        const users = await this.userService.getAll();
        return users;
    }

    @Post('/create')
    async createUser(@Body() userDTO: CreateUserDto) {
        const user = await this.userService.createUser(userDTO);
        return user;
    }
}
