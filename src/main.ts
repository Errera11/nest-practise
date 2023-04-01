import { NestFactory } from '@nestjs/core';
import {appModule} from "./app-module";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(appModule);
    app.listen(PORT, () => console.log('Started with ' + PORT))

}



start();