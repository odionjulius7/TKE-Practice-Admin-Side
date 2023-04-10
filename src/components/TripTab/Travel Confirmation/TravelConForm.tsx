import * as React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

import { Button, Input, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";
import { useState } from "react";
import { createTripConfirmation } from "../../../Features/Trip/tripSlice";

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
const TravelConForm = ({ id }: Props) => {
  const tripStatus = useAppSelector((state) => state.trips.status);
  const [document_link, setDocument_link] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  //
  const handleSubmit = async () => {
    try {
      if (title.length === 0 || setDocument_link.length === 0) return;
      const tripConfirm: {
        title: string;
        document_link: string;
      } = {
        title,
        document_link,
      };

      await dispatch(createTripConfirmation({ tripConfirm, id }));
      console.log(tripConfirm);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };
  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Travel Title</label>
        <Input name="ttile" onChange={(e) => setTitle(e.target.value)} />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Travel Link</label>
        <Input
          name="document_link"
          onChange={(e) => setDocument_link(e.target.value)}
        />
      </Stack>
      <Button variant="contained" onClick={handleSubmit}>
        {tripStatus ? "loading..." : "Submit"}
      </Button>
    </FormControlUnstyled>
  );
};

export default TravelConForm;
