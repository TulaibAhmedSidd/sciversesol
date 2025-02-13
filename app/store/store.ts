import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // Default is localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage, // Define the storage engine (e.g., localStorage)
  whitelist: ["cart","auth"], // Persist only the cart slice
};

const rootReducer = combineReducers({
  example: exampleReducer,
  cart: cartReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       example: exampleReducer,
//       cart: cartReducer,

//     },
//   })
// }

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});
export const persistor = persistStore(store);

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;

// export type RootState = ReturnType<typeof store.getState>;   // Infer RootState from the store
// export type AppDispatch = typeof store.dispatch;             // Infer AppDispatch from the store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>()
export const useAppStore: () => typeof store = useStore;
