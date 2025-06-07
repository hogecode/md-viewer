import { AppDataSource } from "./config/typeormConfig";
import { initializeContainer } from "./inversify.config";
import * as dotenv from 'dotenv';

dotenv.config();

// DIコンテナの初期化
initializeContainer();

let initialized = false;

/**
 * 各ハンドラー内で呼び出す
 * @example
 * await initializeApp();
 * const postService = container.get(PostService);
 */
export async function initializeApp() {
  if (!initialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initialized = true;
  }
}
