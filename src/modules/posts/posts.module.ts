import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { postsProviders } from './providers/posts.providers';
import { PostRepository } from './repository/post.repository';

@Module({
    // imports:[PostRepository],
    providers: [PostsService, ...postsProviders,
                ],
    controllers: [PostsController],
})
export class PostsModule { }