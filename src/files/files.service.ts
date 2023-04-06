import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
const uuid = require('uuid')

@Injectable()
export class FilesService {

    async createFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if(!fs.existsSync(filePath)) await fs.promises.mkdir(filePath, {recursive: true });
            await fs.promises.writeFile(path.join(filePath, fileName), file.buffer, 'utf8');
            return fileName;
        } catch(e) {
            throw new HttpException('File uploading error', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
