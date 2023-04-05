import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthGuard} from "./auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      JwtModule.register({
        secret: process.env.SECRET_JWT || 'secret'
      }),
  ],
    exports: [JwtModule]
})
export class AuthModule {}
