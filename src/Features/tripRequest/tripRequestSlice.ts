import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TripRequest {
  user: {};
  tripDetails: {};
  _id: string | number;
  tripType: string;
  createdAt: string;
  updatedAt: string;
}

interface TipRequestState {
  tripRequests: TripRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: TipRequestState = {
  tripRequests: [],
  loading: false,
  error: null,
};

export const fetchTripRequests = createAsyncThunk(
  "tripRequests/fetchTripRequests",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/request`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch tip requests");
    }
  }
);

export const deleteTripRequest = createAsyncThunk(
  "tripRequests/deleteTripRequest",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/request/${id}`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to delete tip request");
    }
  }
);

export const tipRequestsSlice = createSlice({
  name: "tripRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch trip request
      .addCase(fetchTripRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.tripRequests = action.payload;
      })
      .addCase(fetchTripRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // delete trip request
      .addCase(deleteTripRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTripRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.tripRequests = state.tripRequests.filter(
          (tripRequest) => tripRequest._id !== action.payload
        );
      })
      .addCase(deleteTripRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete trip request";
      });
  },
});

export default tipRequestsSlice.reducer;
