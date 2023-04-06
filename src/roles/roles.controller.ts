import {Controller, Post, Get, Body, Param, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/CreateRoleDto";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('/createRole')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.rolesService.getAll();
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }
}
