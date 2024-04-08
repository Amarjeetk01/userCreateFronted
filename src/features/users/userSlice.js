import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUser,
  fetchUserById,
  createUser,
  updateUserById,
  deleteUserById,
  fetchAllDomains,
} from "./userApi";

const initialState = {
  users: [],
  totalUserPages: 0,
  status: "idle",
  selectedUser: null,
  domains: [],
  domainsStatus: "idle",
  error: null,
};

export const fetchAllUserAsync = createAsyncThunk(
  "users/fetchAllUser",
  async (data) => {
    try {
      const response = await fetchAllUser(data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchUserByIdAsync = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    try {
      const response = await fetchUserById(id);
      return response.data;
    } catch (error) {
      throw new Error(error );
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async ({ first_name,last_name,email,gender,avatar,domain,available}) => {
    try {
      const response = await createUser({ first_name,last_name,email,gender,avatar,domain,available});
      return response.data;
    } catch (error) {
      throw new Error(error );
    }
  }
);

export const updateUserByIdAsync = createAsyncThunk(
  "users/updateUserById",
  async ({ id, info }) => {
    try {
      const response = await updateUserById({ id, info });
      return response.data;
    } catch (error) {
      throw new Error(error );
    }
  }
);

export const deleteUserByIdAsync = createAsyncThunk(
  "users/deleteUserById",
  async (id) => {
    try{
    const response = await deleteUserById(id);
    return response.data;
  } catch (error) {
    throw new Error(error );
  }
  }
);

export const fetchAllDomainsAsync = createAsyncThunk(
  "users/fetchAllDomains",
  async () => {
    const response = await fetchAllDomains();
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.users += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const userData = action.payload.users;

        if (Array.isArray(userData)) {
          state.users = userData;
        } else if (typeof userData === "object" && userData !== null) {
          state.users = [userData];
        } else {
          state.users = [];
        }
        // state.users = action.payload.users;
        state.totalUserPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchAllUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        state.users = [];
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        state.selectedUser = [];
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserByIdAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateUserByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(deleteUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUserByIdAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteUserByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(fetchAllDomainsAsync.pending, (state) => {
        state.domainsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAllDomainsAsync.fulfilled, (state, action) => {
        state.domainsStatus = "idle";
        const domains = action.payload;
        if (Array.isArray(domains)) {
          state.domains = domains;
        } else if (typeof domains === "object" && domains !== null) {
          state.domains = [domains];
        } else {
          state.domains = [];
        }
      })
      .addCase(fetchAllDomainsAsync.rejected, (state, action) => {
        state.domainsStatus = "idle";
        state.error = action.error;
        state.domains = [];
      });
  },
});

export const { increment } = usersSlice.actions;

export const getUser = (state) => state.users.users;
export const totalUserPages = (state) => state.users.totalUserPages;
export const selectedUser = (state) => state.users.selectedUser;
export const usersStatus = (state) => state.users.status;
export const getAllDomains = (state) => state.users.domains;
export const userSliceError = (state) => state.users.error;

export default usersSlice.reducer;
