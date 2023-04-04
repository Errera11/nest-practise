import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserDto} from "./dto/UserDto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async signIn(dto: UserDto) {
        const user = await this.verifyUser(dto);
        return this.generateToken(user);
    }
    async signUp(dto: UserDto) {
        const user = await this.userService.findByEmail(dto.email);
        if(user) throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
        const hashPassword = await bcrypt.hash(dto.password, 3);
        const newUser =
            await this.userService.createUser({email: dto.email, password: hashPassword});
        return this.generateToken(newUser);
    }

    private generateToken(user: User)  {
        const payload = {id: user.id, roles: user.roles, email: user.email}
        return { token: this.jwtService.sign(payload)}
    }

    private async verifyUser(dto: UserDto) {
        const user = await this.userService.findByEmail(dto.email);
        const isValidPass = await bcrypt.compare(dto.password, user.password);
        if(user && isValidPass) return user;
        throw new UnauthorizedException({message: 'Invalid email or password'})
    }
}
