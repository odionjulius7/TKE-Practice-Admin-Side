import * as React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
} from "@mui/material";

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
const PaymentForm = (props: Props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Payment Title</label>
        <Input name="ttile" />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Payment Link</label>
        <Input name="paymentLink" />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Invoice Link</label>
        <Input name="invoiceLink" />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Receipt Link</label>
        <Input name="receiptLink" />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <FormControl variant="standard" sx={{}}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={10}>Not Paid</MenuItem>
            <MenuItem value={20}>Paid</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </FormControlUnstyled>
  );
};

export default PaymentForm;
