import * as React from "react";
import FormControlUnstyled, {
  useFormControlUnstyledContext,
} from "@mui/base/FormControlUnstyled";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Input, Stack, TextareaAutosize } from "@mui/material";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

type Props = {};
const OverViewForm = (props: Props) => {
  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Destination Title</label>
        <Input name="ttile" />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Description</label>
        <Input name="description" />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Start Date</label>
        <Input type="date" name="startDate" />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>End Date</label>
        <Input type="date" name="endDate" />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Upload Image</label>
        <Input type="file" name="image" />
        {/* <HelperText /> */}
      </Stack>
    </FormControlUnstyled>
  );
};

export default OverViewForm;
