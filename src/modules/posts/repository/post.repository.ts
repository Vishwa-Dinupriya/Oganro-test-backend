import { Injectable, Scope } from "@nestjs/common";
import { BaseRepository } from "src/utility/repository/BaseRepository";
import { Post } from "../entity/post.entity";

@Injectable({ scope: Scope.REQUEST })
export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(Post);
  }

  async getAll(): Promise<Post[]> {
    try {
        return this.Model.findAll<Post>({
          order: [['id','DESC']]
      });
    }
    catch (ex: any) {
        throw ex;
    }
}
}