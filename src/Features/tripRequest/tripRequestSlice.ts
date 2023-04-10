import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { TripRequest } from "../../models/TripRequest.interface";

interface TripRequestState {
  tripRequests: TripRequest[];
  singleTripReq: TripRequest[]; // i had to make it an array of TripRequest  cos of some unknown errors
  loading: boolean;
  error: string | null;
}

const initialState: TripRequestState = {
  tripRequests: [],
  singleTripReq: [], // i had to make it an array cos of some unknown errors
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
      // toast.success("Trip request fetched successfully!");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch tip requests");
    }
  }
);

// With this change, the headers parameter will accept an object with any number
// of keys and values, allowing you to pass in the "Content-Type" and "Authorization" headers as necessary
export const fetchSingleTripReq = createAsyncThunk(
  "tripRequests/fetchSingleTripReq",
  async (ids: { id: string; token: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/request/${ids.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ids.token}`,
          },
        }
      );
      // console.log(ids);

      return response.data;
    } catch (error) {
      toast.error("Unable to Trip request!");
      return thunkAPI.rejectWithValue("Unable to fetch tip requests");
    }
  }
);

export const deleteTripRequest = createAsyncThunk(
  "tripRequests/deleteTripRequest",
  async (ids: { id: string; token: string }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/request/${ids.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ids.token}`,
          },
        }
      );
      toast.success("Trip request deleted successfully!");
      return ids.id;
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error(`Trip request with ID ${ids.id} not found`);
      } else {
        toast.error("Unable to delete trip request");
      }
      return thunkAPI.rejectWithValue("Unable to delete trip request");
    }
  }
);

export const markAsSeenTripRequest = createAsyncThunk(
  "tripRequests/markAsSeenTripRequest",
  async (ids: { id: string; token: string }, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/request/${ids.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ids.token}`,
          },
        }
      );
      toast.success("Trip request successfully marked as seen!");
      return ids.id;
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error(`Trip request with ID ${ids.id} not found`);
      } else {
        toast.error("Unable mark trip request as seen");
      }
      return thunkAPI.rejectWithValue("Unable to mark trip request as seen");
    }
  }
);

export const tipRequestsSlice = createSlice({
  name: "tripRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all trip request
      .addCase(fetchTripRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.tripRequests = action.payload.tripRequests.reverse();
      })
      .addCase(fetchTripRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // fetch single trip request
      .addCase(fetchSingleTripReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleTripReq.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTripReq = [action.payload.tripRequest]; // i had to make it an array cos of some unknown errors
      })
      .addCase(fetchSingleTripReq.rejected, (state, action) => {
        state.loading = false;
        state.singleTripReq = [];
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
      })
      // Mark As Seen
      .addCase(markAsSeenTripRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsSeenTripRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Update the 'seen' property of the corresponding trip request in the state
        //   const tripRequest = state.tripRequests.find(
        //     (request) => request.id === action.payload
        //   );
        //   if (tripRequest) {
        //     tripRequest.seen = true;
        //   }
      })
      .addCase(markAsSeenTripRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tipRequestsSlice.reducer;
