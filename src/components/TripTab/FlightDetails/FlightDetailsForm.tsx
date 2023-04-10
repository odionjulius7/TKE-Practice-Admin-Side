import * as React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

import { Button, Input, Stack } from "@mui/material";
import { useState } from "react";
import { createTripFlightDetails } from "../../../Features/Trip/tripSlice";
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";

// const blue = {
//   100: "#DAECFF",
//   200: "#80BFFF",
//   400: "#3399FF",
//   600: "#0072E5",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E7EBF0",
//   200: "#E0E3E7",
//   300: "#CDD2D7",
//   400: "#B2BAC2",
//   500: "#A0AAB4",
//   600: "#6F7E8C",
//   700: "#3E5060",
//   800: "#2D3843",
//   900: "#1A2027",
// };

type Props = { id: any };
const FlightDetailsForm = ({ id }: Props) => {
  const { status } = useAppSelector((state) => state.trips);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    // (e: FormEvent<HTMLFormElement>)
    // e.preventDefault();
    try {
      if (location.length === 0 && date.length === 0) return;
      const flightDetails: { location: string; date: string } = {
        location,
        date,
      };

      await dispatch(createTripFlightDetails({ flightDetails, id }));
      // console.log(flightDetails);

      // setLocation("");
      // setDate("");
    } catch (error) {
      console.log(error);
      // setLocation("");
      // setDate("");
    }
  };
  // console.log(id);

  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Location</label>
        <Input name="location" onChange={(e) => setLocation(e.target.value)} />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Date</label>
        <Input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
        {/* <HelperText /> */}
        <Button variant="contained" onClick={handleSubmit}>
          {status ? "loading..." : "Submit"}
        </Button>
      </Stack>
    </FormControlUnstyled>
  );
};

export default FlightDetailsForm;
