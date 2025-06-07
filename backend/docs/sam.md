### SAMコマンド

```bash
sam build
sam validate
sam deploy --no-execute-changeset
sam local start-api
sam local invoke
sam deploy --guided
```

**環境変数の設定方法**
```yaml
Globals:
  Function:
    Environment:
      Variables:
        NEXT_PUBLIC_COGNITO_USER_POOL_ID: !Ref NEXT_PUBLIC_COGNITO_USER_POOL_ID
        NEXT_PUBLIC_COGNITO_APP_CLIENT_ID: !Ref NEXT_PUBLIC_COGNITO_APP_CLIENT_ID
```
```bash
sam deploy \
  --parameter-overrides \
    xxx=xxx \
    yyy=yyy
```

- CloudWatch Logsの利用