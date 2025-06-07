import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});
