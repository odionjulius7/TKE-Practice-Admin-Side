import * as React from "react";
import Box from "@mui/material/Box";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";
import { Button, Input, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import {
  EditFlightDetails,
  setSelectedItem,
} from "../../Features/Trip/tripSlice";
import moment from "moment";

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

export default function FlightModal({ id, item }: Props) {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);

  const status = useAppSelector((state) => state.trips.loadingTrip);
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    try {
      // if (location.length === 0 && date.length === 0) return;
      const flightDetails: { location: string; date: string } = {
        location: location ? location : item?.location || "",
        date: date ? date : item?.date ? moment(item?.date).format("L") : "",
      };

      await dispatch(
        EditFlightDetails({ flightDetails, id, flightDetailsId: item?._id })
      );
      // console.log(flightDetails);

      setOpen1(false);
      setLocation("");
      setDate("");
    } catch (error) {
      console.log(error);
      setLocation("");
      setDate("");
    }
  };

  // console.log(location);

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
          <FormControlUnstyled defaultValue="" required>
            <Stack sx={{ margin: "0.5rem 0" }}>
              <label>Location</label>
              <Input
                name="location"
                defaultValue={item?.location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {/* <HelperText /> */}
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Date</label>
              <Input
                // type="date"
                name="date"
                defaultValue={moment(item?.date).format("L")}
                onChange={(e) => setDate(e.target.value)}
              />
              {/* <HelperText /> */}
              <Button variant="outlined" onClick={handleSubmit}>
                {status ? "loading..." : "Edit"}
              </Button>
            </Stack>
          </FormControlUnstyled>
        </Box>
      </Modal>
    </div>
  );
}
