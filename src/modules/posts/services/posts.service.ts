import { Injectable, Inject } from '@nestjs/common';
import { Post } from '../entity/post.entity';
import { PostDto } from '../dto/post.dto';
import { POST_REPOSITORY } from '../../../core/constants';
import { PostRepository } from '../repository/post.repository';
import * as fs from 'fs';

@Injectable()
export class PostsService {

    private postRepository_: PostRepository;
    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) { 
       this.postRepository_ = new PostRepository();
    }

    async createPost(post: PostDto): Promise<Post> {
        const imageBase64 = post.imageBase64;
        const post_ = {
            title : post.title,
            body: post.body,
            like_count: 0,
            dislike_count : 0
        };
        let savedPost;
        try {
             savedPost =  await this.postRepository_.save(<Post>post_);  
             fs.writeFileSync('./images/' + savedPost.id + '.jpg', imageBase64.replace('data:image/jpeg;base64,', ''), {encoding: 'base64'});

        } catch (error) {
           console.log(error);
        }
        return savedPost;
    }

    async findAllPosts(): Promise<Post[]> {
        return await this.postRepository.findAll();
    }

    async findPost(id): Promise<Post> {
        return await this.postRepository.findOne({
        	where: { id },
    	});
    }

    async deletePost(id) {
        const deletedResult = await this.postRepository.destroy({ where: { id } });
        try{
            fs.unlinkSync('./images/' + id + '.jpg');
        }catch(err){
            console.log(err);
        }
        
        return deletedResult;
    }

    async updatePost(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.postRepository
        .update(
            { ...data }, 
            { where: { id }, 
              returning: true });

        return { numberOfAffectedRows, updatedPost };
    }

    async likePost(id) {
        const incrementResult = await this.postRepository
          .increment( 'like_count', { by: 1, where: {id} });
        
        return incrementResult;
    }

    async dislikePost(id) {
        const incrementResult = await this.postRepository
        .increment( 'dislike_count', { by: 1, where: {id} });
      
      return incrementResult;
    }
}