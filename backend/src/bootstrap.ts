import { AppDataSource } from "./typeorm/typeormConfig";
import { initializeContainer } from "./inversify.config";
import * as dotenv from "dotenv";

let initialized = false;

/**
 * 各ハンドラー内で呼び出す
 * @example
 * await initializeApp();
 * const postService = container.get(PostService);
 */
export const initializeApp = async () => {
  if (initialized) return; // 再初期化防止

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  // 環境変数の読み込み
  dotenv.config();

  // DIコンテナの初期化
  initializeContainer();

  initialized = true;
};
