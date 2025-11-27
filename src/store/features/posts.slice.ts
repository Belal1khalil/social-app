import { posts } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: posts = {
  posts: null,
  postdetails: null,
  userposts: null,
};

export const getPosts = createAsyncThunk(
  "posts/getposts",
  async (_, { getState }) => {
    const state: any = getState();
    const token = state.userReducer.token;

    const options = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts?limit=50`,
      headers: {
        token,
      },
    };
    let { data } = await axios.request(options);
    return data.posts;
  }
);

export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (id: string, { getState }) => {
    const state: any = getState();
    const token = state.userReducer.token;

    const options = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      headers: {
        token,
      },
    };
    let { data } = await axios.request(options);
    return data.post;
  }
);

export const getuserposts = createAsyncThunk(
  "posts/getuserposts",
  async (userId: string, { getState }) => {
    const state: any = getState();
    const token = state.userReducer.token;

    const options = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/users/${userId}/posts?`,
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data.posts;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log("false | Posts");
      console.log({ state, action });
    });
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.postdetails = action.payload;
    });
    builder.addCase(getPostDetails.rejected, (state, action) => {
      console.log("false | Posts");
      console.log({ state, action });
    });
    builder.addCase(getuserposts.fulfilled, (state, action) => {
      state.userposts = action.payload;
    });
    builder.addCase(getuserposts.rejected, (state, action) => {
      console.log(state, action);
    });
  },
});

export const PostsReducer = postsSlice.reducer;
