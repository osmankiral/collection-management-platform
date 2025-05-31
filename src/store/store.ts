import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "@/features/collections/collectionSlice";
import productsReducer from "@/features/collections/productsSlice";

export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
