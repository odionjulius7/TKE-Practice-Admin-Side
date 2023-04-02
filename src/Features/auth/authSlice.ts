import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { DisplayUser } from "../../models/DisplayUser.interface";
import { LoginUser } from "../../models/LoginUser.interface";
import authService from "../../services/auth.service";

// const storedUser: string | null = localStorage.getItem("user"); //the name of the data store on lstorage is string
// const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

// const storedToken: string | null = localStorage.getItem("loginToken");
// const tokened: string | null = !!storedToken ? JSON.parse(storedToken) : null;
// Http API Calls
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to login");
    }
  }
);

// Extensibility: An interface can be extended to add additional properties, while a type cannot.
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  token?: string | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    resetTokenUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { reset, resetTokenUser } = authSlice.actions;

export const authReducer: Reducer<AuthState> = authSlice.reducer;
