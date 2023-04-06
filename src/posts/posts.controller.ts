import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/CreatePostDto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @Post('createPost')
    @UseInterceptors(FileInterceptor('image'))
    async createPost(@Body() dto: CreatePostDto,
                     @UploadedFile() image: any) {
        return await this.postService.createPost(dto, image);
    }
}
