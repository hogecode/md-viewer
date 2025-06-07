
export const uploadFile = async () => {
  validateMD();
  getSignedURL();
  // ファイルアップロード
  // snackSliceの呼び出し
  
};

const validateMD = async () => {
  // ファイル形式、サイズの確認
  // dompurifyでXSS対策
};

const getSignedURL = async () => {
  // API.getでAPI呼び出し
};

