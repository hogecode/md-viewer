
export const handler = async (event) => {
  // Lambda 関数の処理
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
