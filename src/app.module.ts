import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PostsModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
