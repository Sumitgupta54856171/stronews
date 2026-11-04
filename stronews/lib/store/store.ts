import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "@/lib/store/feed-slice";

export const makeStore = () => configureStore({ reducer: { feed: feedReducer } });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];