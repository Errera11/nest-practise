import {AppController} from "./app-controller";
import {AppProvider} from "./app-provider";
import { Module } from '@nestjs/common';

@Module({
    controllers: [AppController],
    providers: [AppProvider],
})

export class appModule {}
