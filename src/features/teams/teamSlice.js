import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTeamById, addToTeam } from "./teamApi";

const initialState = {
  team: null,
  totalTeamPages: 0,
  status: "idle",
  error: null,
  addedToTeam:false,
};

export const fetchTeamByIdAsync = createAsyncThunk(
  "team/fetchTeamById",
  async (id) => {
    try{
    const response = await fetchTeamById(id);
    return response.data;
    }catch(err){
      throw new Error(err || "Not found" );
    }
  }
);

export const addToTeamAsync = createAsyncThunk(
  "team/addToTeam",
  async (userId) => {
    try {
      const response = await addToTeam(userId);
      return response.data;
    } catch (error) {
      throw new Error(error || "Failed to add to team");
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    increment: (state) => {
      state.team += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamByIdAsync.pending, (state) => {
        state.status = "loading";
        state.addedToTeam=false;
      })
      .addCase(fetchTeamByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.team = action.payload.teamMembers;
        state.totalTeamPages = action.payload.totalPages;
      }).addCase(fetchTeamByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(addToTeamAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.addedToTeam=false;
      })
      .addCase(addToTeamAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addedToTeam=true;
      })
      .addCase(addToTeamAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { increment } = teamSlice.actions;

export const getTeam = (state) => state.team.team;
export const totalTeamPages = (state) => state.team.totalTeamPages;
export const getTeamStatus = (state) => state.team.status;
export const getTeamError = (state) => state.team.error;
export const getTeamAddedMessage = (state) => state.team.addedToTeam;

export default teamSlice.reducer;
