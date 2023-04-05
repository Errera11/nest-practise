import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { Observable } from "rxjs";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const roles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(), context.getClass()
            ])
            if(!roles) return true;

            const req = context.switchToHttp().getRequest();
            const bearer = req.headers.authorization.split(' ')[0];
            const token = req.headers.authorization.split(' ')[1];
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'You are not authorized'});
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => roles.includes((role.value)));
        } catch(e) {
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        }


    }



}