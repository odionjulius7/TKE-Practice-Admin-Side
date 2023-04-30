import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import userSlice from "./users/usersSlice";
import bannerSlice from "./Banner/generalBanner";
import tipRequestsSlice from "./tripRequest/tripRequestSlice";
import tripsSlice from "./Trip/tripSlice";
import { combineReducers } from "redux";

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Define the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  user: userSlice,
  tripRequests: tipRequestsSlice,
  trips: tripsSlice,
  generalBanner: bannerSlice,
});

// Define the persist config
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['user', 'cart'], // persist only 'user' and 'cart' state
  // blacklist: ['products'], // don't persist the 'products' state
};

// Define the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the store
export const store = configureStore({
  reducer: persistedReducer,
  // This middleware accepts serializableCheck
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Define the persistor
export const persistor = persistStore(store);

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";

// import { authReducer } from "./auth/authSlice";
// // import productReducer from "./features/products/productSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // product: productReducer,
//   },
//   // this middleware accept serializableCheck
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
