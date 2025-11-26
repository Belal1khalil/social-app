import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { PostsReducer } from "./features/posts.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    PostsReducer,
  },
});

 type AppStore = typeof store;
export  type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
