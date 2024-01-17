import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './features/user';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'isAuthenticated'] // only user will be persisted
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
