import { Injectable } from '@nestjs/common';
import {User} from './users.model'
import {InjectModel} from "@nestjs/sequelize";
@Injectable()
export class UsersService {

    constructor( @InjectModel(User) private userRepository: typeof User) {}

    async getAll() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
