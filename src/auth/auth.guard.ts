import {CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const bearer = req.headers.authorization.split(' ')[0];
            const token = req.headers.authorization.split(' ')[1];
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'You are not authorized'});
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch(e) {
            throw new UnauthorizedException({message: 'You are not authorized'});
        }

    }


}