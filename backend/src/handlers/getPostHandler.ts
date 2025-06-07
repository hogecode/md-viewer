import { APIGatewayProxyEvent } from "aws-lambda";

/**
 * 1個のDBエントリーを取得する関数
 */
export const handler = async (event: APIGatewayProxyEvent) => {
  // userIdの取得 
  // DBのエントリーを取得
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
