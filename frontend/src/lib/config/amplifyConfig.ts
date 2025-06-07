import { Auth } from "aws-amplify";

export const amplifyConfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
  API: {
    endpoints: [
      {
        name: "MyApi", // 任意の識別名（API呼び出し時に使う）
        endpoint: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        custom_header: async () => {
          try {
            const session = await Auth.currentSession();
            const token = session.getIdToken().getJwtToken();
            return {
              Authorization: token,
            };
          } catch {
            return {};
          }
        },
      },
    ],
  },
};
