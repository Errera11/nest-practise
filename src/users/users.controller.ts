import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUserDto";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddBanDto} from "./dto/AddBanDto";
import {AddRoleDto} from "./dto/AddRoleDto";

@Controller('')
export class UsersController {

    constructor(private userService: UsersService) {}


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/users')
    async getAll() {
        const users = await this.userService.getAll();
        return users;
    }

    @Post('/createUser')
    async createUser(@Body() userDTO: CreateUserDto) {
        const user = await this.userService.createUser(userDTO);
        return user;
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/banUser')
    async banUser(@Body() dto: AddBanDto) {
        return await this.userService.ban(dto);
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/addRole')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.userService.addRole(dto);
    }
}
