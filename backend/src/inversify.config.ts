import { Container } from "inversify";
import "reflect-metadata";
import { PostRepository } from "./repositories/postRepository";
import { PostService } from "./services/postService";

export function initializeContainer(): Container {
  const container = new Container();
  // 依存関係を設定
  container.bind(PostRepository).toSelf().inSingletonScope();
  container.bind(PostService).toSelf().inSingletonScope();

  return container;
}
