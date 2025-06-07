import { Auth } from 'aws-amplify';

export const login = async (email: string, password: string) => {
  return Auth.signIn(email, password);
};

export const logout = async () => {
  return Auth.signOut();
};

export const getCurrentUser = async () => {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().payload;
  } catch (error) {
    return null;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch {
    return null;
  }
};
