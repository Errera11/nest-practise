import {Injectable} from '@nestjs/common';
import {Post} from "./posts.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreatePostDto} from "./dto/CreatePostDto";
import {FilesService} from "../files/files.service";


@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}
    async createPost(dto: CreatePostDto, image: string) {
        const file = await this.fileService.createFile(image);
        return await this.postRepository.create({...dto, image: file});
    }

}
