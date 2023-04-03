import { Injectable } from '@nestjs/common';
import {User} from './users.model'
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
@Injectable()
export class UsersService {

    constructor( @InjectModel(User) private userRepository: typeof User,
                 private rolesService: RolesService) {}

    async getAll() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async createUser({email, password}) {
        const user = await this.userRepository.create({email, password});
        const role = await this.rolesService.getRoleByValue('USER')
        await user.$set('roles', role.id);
        return user;
    }
}
