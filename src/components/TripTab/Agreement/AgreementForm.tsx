import * as React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { createTripAgreement } from "../../../Features/Trip/tripSlice";
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";
import { useState } from "react";

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
const AgreementForm = ({ id }: Props) => {
  const tripStatus = useAppSelector((state) => state.trips.status);
  const [document_link, setDocument_link] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  //
  const handleSubmit = async () => {
    try {
      if (title.length === 0 || document_link.length === 0) return;
      const agreement: {
        title: string;
        document_link: string;
        status: string;
      } = {
        title,
        document_link,
        status: status ? status : "Not Signed",
      };

      await dispatch(createTripAgreement({ agreement, id }));
      console.log(agreement);

      // setDocument_link("");
      // setTitle("");
    } catch (error) {
      console.log(error);
      // setDocument_link("");
      // setTitle("");
    }
  };
  console.log(id);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Doc. Title</label>
        <Input name="title" onChange={(e) => setTitle(e.target.value)} />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Agreement Link</label>
        <Input
          name="document_link"
          onChange={(e) => setDocument_link(e.target.value)}
        />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <FormControl variant="standard" sx={{}}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={stat}
            name="status"
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="Not Signed">Not Signed</MenuItem>
            <MenuItem value="Signed">Signed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          {tripStatus ? "loading..." : "Submit"}
        </Button>
      </Stack>
    </FormControlUnstyled>
  );
};

export default AgreementForm;
