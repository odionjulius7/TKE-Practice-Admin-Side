import * as React from "react";
import Box from "@mui/material/Box";
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
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { editPayment } from "../../Features/Trip/tripSlice";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
};

type Props = {
  id: any;
  item: any;
};

export default function PaymentModal({ id, item }: Props) {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);
  //
  const tripStat = useAppSelector((state) => state.trips.loadingTrip);
  const [payment_link, setPayment_link] = useState("");
  const [invoice_link, setInvoice_link] = useState("");
  const [receipt_link, setReceipt_link] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  //

  const handleSubmit = async () => {
    try {
      const payment: {
        title: string;
        payment_link: string;
        status: string;
        invoice_link: string;
        amount: string;
        receipt_link: string;
      } = {
        title: title ? title : item?.title || "",
        payment_link: payment_link ? payment_link : item?.payment_link || "",
        status: status ? status : "Not Paid",
        amount: amount ? amount : item?.amount || "",
        invoice_link: invoice_link ? invoice_link : item?.invoice_link || "",
        receipt_link,
      };

      await dispatch(editPayment({ payment, id, flightDetailsId: item?._id }));
      console.log(payment);

      setOpen1(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  // console.log(item);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          padding: "0",
          margin: "0",
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
        }}
      >
        Edit
      </Button>
      <Modal
        open={open1}
        onClose={handleClose}
        // onClick={() => handleClicked(item._id)}
      >
        <Box sx={style}>
          <Stack sx={{ textAlign: "center" }}>
            <Typography>Edit This details</Typography>
          </Stack>
          <FormControlUnstyled defaultValue="">
            <Stack sx={{ margin: "0.5rem 0" }}>
              <label>Payment Title</label>
              <Input
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={item?.title}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Amount</label>
              <Input
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                defaultValue={item?.amount}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Payment Link</label>
              <Input
                name="payment_link"
                onChange={(e) => setPayment_link(e.target.value)}
                defaultValue={item?.payment_link}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Invoice Link</label>
              <Input
                name="invoice_link"
                onChange={(e) => setInvoice_link(e.target.value)}
                defaultValue={item?.invoice_link}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Receipt Link</label>
              <Input
                name="receipt_link"
                onChange={(e) => setReceipt_link(e.target.value)}
                // defaultValue={item?.invoice_link}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <FormControl variant="standard" sx={{}}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
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
              {tripStat ? "loading..." : "Submit"}
            </Button>
          </FormControlUnstyled>
        </Box>
      </Modal>
    </div>
  );
}
