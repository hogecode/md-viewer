
/**
 * S3トリガーでMDをRDBに保存する関数
 */
export const handler = async (event: any) => {
  // S3キーからユーザーidなどのメタデータを取得
  // MDファイルをXSS対策して文字列に変換
  // ユーザーidと共にRDBに保存
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
