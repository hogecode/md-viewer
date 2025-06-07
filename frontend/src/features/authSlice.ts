import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setEmail, login, logout } = authSlice.actions;
export default authSlice.reducer;
