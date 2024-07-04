// import { configureStore } from '@reduxjs/toolkit';

// import userReducer from './user';
// import orderReducer from "./order";
// export const store = configureStore({
//   reducer: {
// user: userReducer,
// order: orderReducer
//   },
// });

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage
import userReducer from "./user";
import orderReducer from "./order";
import orderConfigReducer from "./orderConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
// add the reducers that need to be persisted
const reducersToPersist = ['user', 'orderConfig'];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: reducersToPersist,
};

const reducers = combineReducers({
  user: userReducer,
  order: orderReducer,
  orderConfig: orderConfigReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };