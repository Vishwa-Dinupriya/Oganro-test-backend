import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Post as PostEntity } from '../entity/post.entity';
import { PostDto } from '../dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    async findAll() {
        try {
            // get all posts in the db
            return await this.postService.findAllPosts();
        } catch (err) {
            throw err;
        }

    }

    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {

        try {
            // create a new post and return the newly created post
            return await this.postService.createPost(post);
        } catch (err) {
            throw err;
        }

    }


    @Put('/like/:id')
    async likePost(@Param('id') id: number): Promise<PostEntity> {

        try {
            const incrementResult = await this.postService.likePost(id);

            // return the increment Result
            return incrementResult;
        } catch (err) {
            throw err;
        }

    }

    @Put('/dislike/:id')
    async dislikePost(@Param('id') id: number): Promise<PostEntity> {
        const incrementResult = await this.postService.dislikePost(id);

        try {
            // return the increment Result
            return incrementResult;
        } catch (err) {
            throw err;
        }

    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {

        try {
            // delete the post with this id
            const deleted = await this.postService.deletePost(id);

            // if the number of row affected is zero, 
            // then the post doesn't exist in our db
            if (deleted === 0) {
                throw new NotFoundException('This Post doesn\'t exist');
            }

            // return success message
            return deleted;
        } catch (err) {
            throw err;
        }

    }
}