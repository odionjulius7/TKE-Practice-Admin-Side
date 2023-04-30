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
import {
  EditFlightDetails,
  editAgreement,
  setSelectedItem,
} from "../../Features/Trip/tripSlice";
import moment from "moment";
import { useEffect, useState } from "react";

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

export default function AgreementModal({ id, item }: Props) {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);

  const tripStatus = useAppSelector((state) => state.trips.loadingTrip);
  const [document_link, setDocument_link] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  //
  const handleSubmit = async () => {
    try {
      //   if (title.length === 0 || document_link.length === 0) return;
      const agreement: {
        title: string;
        document_link: string;
        status: string;
      } = {
        title: title ? title : item?.title || "",
        document_link: document_link
          ? document_link
          : item?.document_link || "",
        status: status ? status : "Not Signed",
      };

      await dispatch(
        editAgreement({ agreement, id, flightDetailsId: item?._id })
      );
      console.log(agreement);
      setOpen1(false);
      setDocument_link("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  console.log(item);

  const titleRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [open1]);
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
              <label>Doc. Title</label>
              <Input
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={item?.title}
                ref={titleRef}
              />
            </Stack>
            <Stack sx={{ margin: "1.2rem 0" }}>
              <label>Agreement Link</label>
              <Input
                name="document_link"
                onChange={(e) => setDocument_link(e.target.value)}
                defaultValue={item?.document_link}
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
                  defaultValue={item?.status}
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
        </Box>
      </Modal>
    </div>
  );
}
