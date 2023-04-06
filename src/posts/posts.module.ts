import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";
import {User} from "../users/users.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([Post]),
  FilesModule]
})
export class PostsModule {}
