import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface BannerState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  datas: any;
}

const initialState: BannerState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  datas: null,
};

export const uploadGeneralBanner = createAsyncThunk(
  "banner/uploadGeneralBanner",
  async ({ formData }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://tke-api.onrender.com/api/v1/general/banner`,
        // `https://tke-api.onrender.com/api/v1/general/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("General Banner Uploaded Successfully");
      return response.data;
    } catch (error: any) {
      toast.error("Upload Failed..");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadGeneralBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        // state.errorMessage = "";
      })
      .addCase(uploadGeneralBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.datas = action.payload.newGeneralBanner;
      })
      .addCase(uploadGeneralBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export default bannerSlice.reducer;
