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
- viteの設定
- amplifyでcognitoとの連携
- ルーティング設定
- rtkスライスの作成

**フォルダ構造**
```plaintext
- src
    - assets
    - components
        - LoginForm.tsx
        - RegisterForm.tsx # zod, formikの利用
        - FileUpload.tsx
        - FileList.tsx
        - SearchBar.tsx
        - Header.tsx
        - InfinitePagination.tsx
        - UserAvater.tsx # ログアウト
    - features # RTKスライス
        - authSlice.ts # ログイン、ログアウト
        - fileSlice.ts # 2ペイン構造のため、ファイルIDの所持
        - searchSlice.ts # 検索条件の所持
        - snackSlice.ts # メッセージ表示
    - hooks
    - pages
        - templatePage.tsx
        - LoginPage.tsx
        - RegisterPage.tsx
        - Dashboard.tsx # クエリパラメータの利用
    - services # API, Amplifyサービス
        - authService.ts # 登録、ログイン、ログアウト、スナック
        - fileValidationService.ts # 検証、xss対策, zodの利用
        - fileUploadService.ts
        - searchService.ts
        - snackMessageService.ts
    - utils
        - validateEmail.ts
        - formatFileSize.ts
        - handleError.ts
    - config
        - awsConfig.ts
        - apiConfig.ts
    - App.tsx
    - main.tsx
- public
- vite.config.ts
- .env.example
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
