import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async getAll() {
        return await this.roleRepository.findAll();
    }


    async createRole(dto) {
        return await this.roleRepository.create(dto)
    }

    async getRoleByValue(value: string) {
        return await this.roleRepository.findOne({where: {value}});
    }
}
