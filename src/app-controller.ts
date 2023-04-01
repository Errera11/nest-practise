import { Controller, Get } from '@nestjs/common';
import {AppProvider} from "./app-provider";
@Controller()
export class AppController {

    constructor(private appProvier: AppProvider) {
    }
    @Get('/hello')
    getUsers() {
        return this.appProvier.sayHi();
    }
}