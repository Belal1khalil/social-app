import { User } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: User = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
};

export const signup = createAsyncThunk(
  "user/signup",
  async (values: {
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    const options = {
      url: "https://linked-posts.routemisr.com/users/signup",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);

    return data;
  }
);

// logic of login

export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      method: "POST",
      url: "https://linked-posts.routemisr.com/users/signin",
      data: values,
    };
    const { data } = await axios.request(options);
    return data;
  }
);




export function logout() {
   localStorage.removeItem("token")
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload.message === "success") {
        toast.success("Account Created Successfully");
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      toast.error("Email already exist");
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
       if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
      toast.success("Welcome Back");
    });
    builder.addCase(login.rejected, (state, action) => {
      toast.error("Incorrect email or password");
    });
  },
});

export const userReducer = userSlice.reducer;
