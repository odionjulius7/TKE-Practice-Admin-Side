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
import { editVisa } from "../../Features/Trip/tripSlice";
import moment from "moment";
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

export default function VisaModal({ id, item }: Props) {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);

  const tripStatus = useAppSelector((state) => state.trips.loadingTrip);
  const [document_link, setDocument_link] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  //

  const handleSubmit = async () => {
    try {
      // if (title.length === 0 || setDocument_link.length === 0) return;
      const visa: {
        title: string;
        document_link: string;
      } = {
        title: title ? title : item?.title || "",
        document_link: document_link
          ? document_link
          : item?.document_link || "",
      };
      await dispatch(editVisa({ visa, id, flightDetailsId: item?._id }));
      console.log(visa);
      setOpen1(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(item);

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
      <Modal open={open1} onClose={handleClose}>
        <Box sx={style}>
          <Stack sx={{ textAlign: "center" }}>
            <Typography>Edit This details</Typography>
          </Stack>
          <FormControlUnstyled defaultValue="" required>
            <Stack sx={{ margin: "0.5rem 0" }}>
              <label>Visa Title</label>
              <Input
                name="ttile"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={item?.title}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Visa Link</label>
              <Input
                name="document_link"
                onChange={(e) => setDocument_link(e.target.value)}
                defaultValue={item?.document_link}
              />
            </Stack>
            <Button variant="contained" onClick={handleSubmit}>
              {tripStatus ? "loading..." : "Edit"}
            </Button>
          </FormControlUnstyled>
        </Box>
      </Modal>
    </div>
  );
}
