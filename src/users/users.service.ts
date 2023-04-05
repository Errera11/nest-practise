import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from './users.model'
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/AddRoleDto";
import {AddBanDto} from "./dto/AddBanDto";
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
        user.roles = [role];
        return user;
    }

    async findByEmail(value: string) {
        return await this.userRepository.findOne({where: {email: value}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.role);
        if(!user || !role) throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);

        user.$add('roles', role);
        await user.save();
        return dto;
    }

    async ban(dto: AddBanDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user) throw new HttpException('User  not found', HttpStatus.NOT_FOUND);

        user.banned = true;
        user.banReason = dto.reason;
        await user.save();
        return dto;
    }
}
