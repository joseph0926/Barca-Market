import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/auth/reducers/auth.reducer';
import logoutReducer from '@/features/auth/reducers/logout.reducer';
import buyerReducer from '@/features/buyer/reducers/buyer.reducer';
import sellerReducer from '@/features/sellers/reducers/seller.reducer';
import categoryReducer from '@/shared/header/reducers/category.reducer';
import headerReducer from '@/shared/header/reducers/header.reducer';
import notificationReducer from '@/shared/header/reducers/notification.reducer';

import { api } from './api';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist']
};

export const combinedReducers = combineReducers({
  [api.reducerPath]: api.reducer,
  authUser: authReducer,
  logout: logoutReducer,
  buyer: buyerReducer,
  seller: sellerReducer,
  header: headerReducer,
  showCategoryContainer: categoryReducer,
  notification: notificationReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export const rootReducers: Reducer<RootState> = (state, action) => {
  if (action.type === 'logout/logout') {
    state = {} as RootState;
  }
  return combinedReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
