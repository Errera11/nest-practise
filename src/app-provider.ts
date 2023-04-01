
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppProvider {
    sayHi(){
        return 'hello';
    }
}