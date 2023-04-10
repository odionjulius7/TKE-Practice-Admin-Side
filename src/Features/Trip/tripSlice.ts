import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Trips } from "../../models/TripRequest.interface";

interface TripRequestState {
  allTrips: Trips[];
  usertrips: Trips[];
  singleTrip: Trips | null; // i had to make it an array of TripRequest  cos of some unknown errors
  loadingTrip: boolean;
  error: string | null;
  createdTripId: { msg: string; _id: string } | null;
  status: boolean;
}

const initialState: TripRequestState = {
  allTrips: [],
  usertrips: [],
  singleTrip: null,
  loadingTrip: false,
  error: null,
  createdTripId: null,
  status: false,
};

export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (ids: { _id: string; token1: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${ids._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ids.token1}`,
          },
        }
      );
      toast.success("Trip created successfully!");
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip!");
      return thunkAPI.rejectWithValue("Unable to create Trip");
    }
  }
);

export const fetchAUsersTrip = createAsyncThunk(
  "trips/fetchAUsersTrip",
  async (ids: { _id: string; token: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/user/${ids._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ids.token}`,
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

export const fetchSingleTrip = createAsyncThunk(
  "trips/fetchSingleTrip",
  async (ids: { token: string; id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${ids.id}`,
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

// OverView
export const createTripOverview = createAsyncThunk(
  "trips/createTripOverview",
  async ({ formData, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/overview`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip overview created successfully!");
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip overview!");
      return thunkAPI.rejectWithValue("Unable to create Trip overview");
    }
  }
);
// OverView

// flight details
export const createTripFlightDetails = createAsyncThunk(
  "trips/createTripFlightDetails",
  async ({ flightDetails, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/flightDetails`,
        { ...flightDetails },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip flight details created successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip flight details!");
      return thunkAPI.rejectWithValue("Unable to create Trip flight details");
    }
  }
);
// flight details

//  agreement
export const createTripAgreement = createAsyncThunk(
  "trips/createTripAgreement",
  async ({ agreement, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/agreement`,
        { ...agreement },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip agreement created successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip agreement!");
      return thunkAPI.rejectWithValue("Unable to create Trip agreement");
    }
  }
);
//  agreement

//  payment
export const createTripPayment = createAsyncThunk(
  "trips/createTripPayment",
  async ({ payment, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/payment`,
        { ...payment },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip payment created successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip payment!");
      return thunkAPI.rejectWithValue("Unable to create Trip payment");
    }
  }
);
// payment

//  Trip Confrmation
export const createTripConfirmation = createAsyncThunk(
  "trips/createTripConfirmation",
  async ({ tripConfirm, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/confirmation`,
        { ...tripConfirm },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip payment created successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip payment!");
      return thunkAPI.rejectWithValue("Unable to create Trip payment");
    }
  }
);
// Trip Confrmation

//  Trip Confrmation
export const createTripVisa = createAsyncThunk(
  "trips/createTripVisa",
  async ({ visa, id }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/trip/${id}/visa`,
        { ...visa },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip payment created successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Unable to create Trip payment!");
      return thunkAPI.rejectWithValue("Unable to create Trip payment");
    }
  }
);
// Trip Confrmation
//
const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    resetTripId: (state) => {
      state.createdTripId = null;
    },
    resetLoadingTrip: (state) => {
      state.status = false;
      // state.loadingTrip = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all trip request
      .addCase(fetchAUsersTrip.pending, (state) => {
        state.loadingTrip = true;
        state.error = null;
      })
      .addCase(fetchAUsersTrip.fulfilled, (state, action) => {
        state.loadingTrip = false;
        state.usertrips = action.payload.trips.reverse();
      })
      .addCase(fetchAUsersTrip.rejected, (state, action) => {
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // fetch single trip
      .addCase(fetchSingleTrip.pending, (state) => {
        state.loadingTrip = true;
        state.error = null;
      })
      .addCase(fetchSingleTrip.fulfilled, (state, action) => {
        state.loadingTrip = false;
        state.singleTrip = action.payload.trip;
      })
      .addCase(fetchSingleTrip.rejected, (state, action) => {
        state.loadingTrip = false;
        state.singleTrip = null;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // create trip
      .addCase(createTrip.pending, (state) => {
        // Handle successful createTrip here
        state.loadingTrip = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        // Handle successful createTrip here
        state.loadingTrip = false;
        state.createdTripId = action.payload;
      })
      .addCase(createTrip.rejected, (state, action) => {
        // Handle rejected createTrip here
        state.loadingTrip = false;
        state.createdTripId = null;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // trip overview
      .addCase(createTripOverview.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripOverview.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripOverview.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to fetch trip requests";
      })
      // trip flift details
      .addCase(createTripFlightDetails.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripFlightDetails.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripFlightDetails.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to create flight details";
      })
      // trip agreement
      .addCase(createTripAgreement.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripAgreement.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripAgreement.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to create agreement";
      })
      // trip payment
      .addCase(createTripPayment.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripPayment.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripPayment.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to create payment";
      })
      // trip confirmation
      .addCase(createTripConfirmation.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripConfirmation.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripConfirmation.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to create payment";
      })
      // trip Visa
      .addCase(createTripVisa.pending, (state) => {
        // state.status = "loading";
        state.status = true;
        state.loadingTrip = false;
        state.error = null;
      })
      .addCase(createTripVisa.fulfilled, (state) => {
        // state.status = "succeeded";
        state.status = false;
        state.loadingTrip = false;
      })
      .addCase(createTripVisa.rejected, (state, action) => {
        // state.status = "failed";
        state.status = false;
        state.loadingTrip = false;
        state.error = action.error.message || "Failed to create payment";
      });
  },
});

export const { resetTripId, resetLoadingTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
