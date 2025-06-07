# md-viewer

このアプリは、markdownをWUSIWUGエディタでの編集や、ファイルアップロードを通じてアップロードし、全文検索で簡単に表示することを目的にしています。

まだ殆ど開発できていないので動作はしません。以下はあくまで予定です。

### フロント
- ユーザー登録、ログイン
- ログイン後にs3にアップロード
    - gDriveとoauth連携し、選択してアップロード
- 一覧表示
- 全文検索

**使用技術** 
- rtk
- amplify
    - (S3.put(), API.get(), API.post()など) 
    - S3メタデータの利用(userId) 
    - amplifySDKでトークンは自動管理される
- s3にデプロイ

**手順**
- amplifyでcognitoとの連携
- ルーティング設定
- rtkスライスの作成

**フォルダ構造**
```plaintext
- public/                      # 静的ファイル（画像やフォントなど）
- src/
  - assets/                   # アイコンや画像
  - components/               # 再利用可能な UI コンポーネント
    - LoginForm.tsx
    - RegisterForm.tsx
    - FileUpload.tsx
    - FileList.tsx
    - SearchBar.tsx
    - Header.tsx
    - InfinitePagination.tsx
    - UserAvatar.tsx
  - features/                 # Redux Toolkit slices
    - auth/
      - authSlice.ts
    - file/
      - fileSlice.ts
    - search/
      - searchSlice.ts
    - snack/
      - snackSlice.ts
  - hooks/                    # カスタムReact Hooks
  - lib/                      # 各種サービス, util的な処理
    - services/
      - authService.ts
      - fileUploadService.ts
      - fileValidationService.ts
      - searchService.ts
      - snackMessageService.ts
    - utils/
      - validateEmail.ts
      - formatFileSize.ts
      - handleError.ts
    - config/
      - awsConfig.ts
      - apiConfig.ts
  - app/                      # Next.js App Router pages
    - login/
      - page.tsx             
    - register/
      - page.tsx             
    - dashboard/
      - page.tsx             # クエリでパラメータ取得
    - template/
      - page.tsx             # templatePage.tsx に相当
  - store/                    # Redux store 設定
    - index.ts
  - styles/                   # グローバル/モジュールCSS
  - middleware.ts             # Next.js middleware（任意）
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
    - メタデータからユーザーIDを取得し、mdをrdbに保存 
    - XSS対策(dompurify)    
- 一覧表示用 
    - event.requestContext.authorizerでlambda認証 
- posts/id(GET, DELETE) 

**使用技術** 
- sam
- inversifyjs, typeorm 
- lambda, cognito, apigateway, psql
- openAPI

**手順**
- samTemplate.yamlの作成
- handlersの連携
- inversifyの設定
- RDBとの連携
- 実装

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
    - utils
        - auth.ts # event.requestContext.authorizerから取得
        - xssFilter.ts # mdをクリーンにする
        - openApiValidator.ts # 省略
    - models
        - post.ts # ユーザID, タイトル, 本文
    - repositories
        - postRepository.ts # userIdとページネーションで取得
    - config
        - apiGateway.ts # 省略
        - cognito.ts # 省略
        - samTemplate.yaml
        - typeormConfig.ts # 省略
-tests
    - handlers
    - services
    - utils
- inversify.config.ts # repository, serviceなど
- .env.example
```
