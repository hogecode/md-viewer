import { injectable } from "inversify";
import { APIGatewayProxyEvent } from "aws-lambda";

@injectable()
export class UserService {
  /**
   * Lambdaのイベント情報からユーザーIDを取得する関数
   */
  getUserId(event: APIGatewayProxyEvent): string {
    const claims = event.requestContext.authorizer?.claims;

    if (!claims || !claims.sub) {
      throw new Error("Unauthorized: user claims not found");
    }

    return claims.sub;
  }

  /**
   * Lambdaのイベント情報からメールアドレスを取得する関数
   */
  getUserEmail(event: APIGatewayProxyEvent): string {
    const claims = event.requestContext.authorizer?.claims;

    if (!claims || !claims.email) {
      throw new Error("Unauthorized: email not found in claims");
    }

    return claims.email;
  }
}
