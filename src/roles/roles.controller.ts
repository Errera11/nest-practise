import {Controller, Post, Get, Body, Param} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/CreateRoleDto";

@Controller('/createRole')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Get()
    getAll() {
        return this.rolesService.getAll();
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }
}
