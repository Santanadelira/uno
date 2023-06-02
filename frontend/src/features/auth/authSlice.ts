import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  auth: {
    userInfo: {
      id: string;
      nome: string;
      email: string;
      cargo: string;
    };
    userToken: string;
    expiracaoToken: string;
  };
}

const initialState = {
  userInfo: {},
  userToken: null,
  expiracaoToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.expiracaoToken = action.payload.expiracaoToken;
    },

    logout: (state) => {
      (state.userInfo = {}),
        (state.userToken = null),
        (state.expiracaoToken = null);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: AuthState) => state.auth.userInfo;
export const selectToken = (state: AuthState) => state.auth.userToken;
export const selectExpiracao = (state: AuthState) => state.auth.expiracaoToken;
