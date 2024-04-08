import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, fetchAuth } from "./authApi";

const initialState = {
  user: null,
  status:null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (authData, { rejectWithValue }) => {
    try {
      const response = await login(authData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAuthAsync = createAsyncThunk(
  "auth/fetchAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUserAsync = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
      await logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUserAsync.pending, (state) => {
          state.loading = true;
          state.status=null;
          state.error=null;
        })
        .addCase(registerUserAsync.pending, (state) => {
          state.loading = true;
          state.status=null;
          state.error=null;
        })
        .addCase(fetchAuthAsync.pending, (state) => {
          state.loading = true;
          state.error=null;
        })
        .addCase(loginUserAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.status = action.payload.status;
          state.error = null;
        })
        .addCase(registerUserAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.status = action.payload.status;
          state.error = null;
        })
        .addCase(fetchAuthAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(logoutUserAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(logoutUserAsync.fulfilled, (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = null;
          state.status=null;
        })
        .addCase(logoutUserAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload : 'Logout failed';
        })
        .addMatcher(
          (action) => {
            return action.type.endsWith("/rejected");
          },
          (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload : "Unknown error occurred";
          }
        );
    },
  });
  
  

export const getAuth = (state) => state.auth.user;
export const authStatus = (state) => state.auth.status;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const authError = (state) => state.auth.error;
export const isAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
