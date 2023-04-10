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
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";
import { useState } from "react";
import { createTripPayment } from "../../../Features/Trip/tripSlice";

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
const PaymentForm = ({ id }: Props) => {
  const tripStatus = useAppSelector((state) => state.trips.status);
  const [payment_link, setPayment_link] = useState("");
  const [invoice_link, setInvoice_link] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  //
  const handleSubmit = async () => {
    try {
      if (title.length === 0 || payment_link.length === 0) return;
      const payment: {
        title: string;
        payment_link: string;
        status: string;
        invoice_link: string;
        amount: string;
      } = {
        title,
        payment_link,
        status: status ? status : "Not Paid",
        amount,
        invoice_link,
      };

      await dispatch(createTripPayment({ payment, id }));
      console.log(payment);

      // setPayment_link("");
      // setTitle("");
    } catch (error) {
      console.log(error);
      // setPayment_link("");
      // setTitle("");
    }
  };
  // console.log(id);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Payment Title</label>
        <Input name="title" onChange={(e) => setTitle(e.target.value)} />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Amount</label>
        <Input name="amount" onChange={(e) => setAmount(e.target.value)} />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Payment Link</label>
        <Input
          name="payment_link"
          onChange={(e) => setPayment_link(e.target.value)}
        />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Invoice Link</label>
        <Input
          name="invoice_link"
          onChange={(e) => setInvoice_link(e.target.value)}
        />
      </Stack>
      {/* <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Receipt Link</label>
        <Input name="receiptLink" />
      </Stack> */}
      <Stack sx={{ margin: "1.2rem 0" }}>
        <FormControl variant="standard" sx={{}}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={age}
            name="status"
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Not Paid">Not Paid</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Button variant="contained" onClick={handleSubmit}>
        {tripStatus ? "loading..." : "Submit"}
      </Button>
    </FormControlUnstyled>
  );
};

export default PaymentForm;
