# md-viewer

このアプリは、markdownをWUSIWUGエディタでの編集や、ファイルアップロードを通じてアップロードし、全文検索で簡単に表示することを目的にしています。

まだ殆ど開発できていないので途中です。以下はあくまで予定です。

### 仕様手順

1. バックエンドの初期設定後、SAMをビルド

**前提条件**
- `sam-cli`がインストールされていること
- `aws-configure`で認証情報が設定されていること
```bash
cd backend
npm install
npm run build
sam build
```

2. SAMをデプロイ
```bash
sam deploy
```

3. フロントの環境変数の設定

`sam deploy`の出力を参考にして設定
```bash
cd frontend
cp .env.example .env
```

4. フロントの起動
```bash
npm run serve
```

### フロント
**機能**
- ユーザー登録、ログイン
- ログイン後にs3にアップロード
    - gDriveとoauth連携し、選択してアップロード
- 一覧表示(ページネーション)
- 全文検索

**使用技術** 
- nextjs
- shadcnui + tailwind # UIのカスタム性を重視
- atomicdesign + MVVM
- rtk
- amplify
    - (S3.put(), API.get(), API.post()など) 
    - S3メタデータを利用してアップロード(userId) 
    - amplifySDKでトークンは自動管理される
- dockerイメージを作成し、ECSにデプロイ

**フォルダ構造**
```plaintext
- public/                     # 静的ファイル（画像やフォントなど）
- src/
  - assets/                   # アイコンや画像
  - components/      
    - atom/
    - molecules/
    - organisms/
  - features/                 # Redux Toolkit slices
      - authSlice.ts
      - fileSlice.ts
      - searchSlice.ts
      - snackSlice.ts
  - hooks/                    # カスタムReact Hooks
  - lib/                      # 各種サービス
    - services/
      - authService.ts
      - fileUploadService.ts
      - fileValidationService.ts
      - searchService.ts
      - snackMessageService.ts
    - config/
      - amplifyConfig.ts
  - app/                      # Next.js App Router pages
    - login/
      - page.tsx             
    - register/
      - page.tsx             
    - dashboard/
      - page.tsx              # クエリでパラメータ取得
  - store/                    # Redux store 設定
    - index.ts
  - styles/                   # グローバル/モジュールCSS
  - middleware.ts   
- .env.example
- next.config.js
- tsconfig.json
- package.json
- .gitignore
```

### バックエンド
**エンドポイント** 
- 署名付きURL生成 
- s3トリガーlambda 
    - S3メタデータからユーザーIDを取得し、mdをrdbに保存 
    - XSS対策(dompurify)    
- 一覧表示用 
    - event.requestContext.authorizerでユーザーIDを取得
- posts/id(GET, DELETE) 

**使用技術** 
- sam # AWSプロビジョニング用
    - lambda, cognito, apigateway, psql
- inversifyjs # DI用
- typeorm # ORM

**フォルダ構造**
```plaintext
- src
    - handlers
        - signedUrlHandler.ts # 署名付きURLを生成
        - s3TriggerHandler.ts # メタデータ、xss対策、mdとidをRDBに保存                            　
        - postListHandler.ts # - event.requestContext.authorizerでlambda認証 
        - getPostHandler.ts 
        - deletePostHandler.ts
    - services
        - postService.ts # 署名付きURL生成
        - s3Service.ts # メタデータ取得、削除
        - userService.ts # event.requestContext.authorizerから取得
        - xssFilter.ts # mdをクリーンにする
    - models
        - post.ts # ユーザID, タイトル, 本文
    - repositories
        - postRepository.ts # userIdとページネーションで取得
    - typeorm
        - typeormConfig.ts 
        - migration.sql # 全文検索インデックスはtypeormでは作成できないので手動で実行
-tests
    - handlers
    - services
    - utils
- inversify.config.ts # repository, serviceなどをDIで注入
- bootstrap.ts # 各ハンドラーで実行する初期化処理
- template.yml # SAMのファイル
- .env.example
```
