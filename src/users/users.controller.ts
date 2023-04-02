import { Controller } from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    async getAll() {
        const response = await this.userService.getAll();
    }
}
