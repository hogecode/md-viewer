import { APIGatewayProxyEvent } from "aws-lambda";

/**
 * 署名付きURLを作成する関数
 */
export const handler = async (event: APIGatewayProxyEvent) => {
  // 署名付きURLを作成
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
