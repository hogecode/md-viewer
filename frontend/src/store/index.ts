import { configureStore } from '@reduxjs/toolkit';
import snackReducer from "@/features/snackSlice"
import authReducer from "@/features/authSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// whitelist, blacklistで永続化対象を管理
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

// reducerをまとめる
const rootReducer = combineReducers({
  snack: snackReducer,
  auth: authReducer,
});

// localStorageを利用してリデューサを永続化
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), 
});

export const persistor = persistStore(store);

// 型エクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
