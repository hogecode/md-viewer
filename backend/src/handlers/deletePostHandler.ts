import { APIGatewayProxyEvent } from "aws-lambda";

/**
 * MDのエントリーを削除する関数
 */
export const handler = async (event: APIGatewayProxyEvent) => {
  // userIdの取得 
  // DBのエントリーを削除
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
