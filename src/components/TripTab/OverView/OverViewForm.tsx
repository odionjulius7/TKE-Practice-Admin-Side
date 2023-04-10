import { useState } from "react";
import FormControlUnstyled, {
  useFormControlUnstyledContext,
} from "@mui/base/FormControlUnstyled";

import { Button, Input, Stack } from "@mui/material";
import {
  createTripOverview,
  resetLoadingTrip,
} from "../../../Features/Trip/tripSlice";
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";
import { toast } from "react-toastify";

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

type Props = {
  id: any;
};
const OverViewForm = ({ id }: Props) => {
  const { status } = useAppSelector((state) => state.trips);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    // e: React.FormEvent<HTMLFormElement>
    // e.preventDefault();
    if (title.length === 0 || !image) {
      return toast.info("fill all inputs including image");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    if (image) {
      formData.append("image", image);
    }

    // "downlevelIteration": true,// add this to the typescript.json compilerOptions when looping through formData
    console.log([...formData]);
    try {
      await dispatch(createTripOverview({ formData, id: id }));
      dispatch(resetLoadingTrip());
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    // <>
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Destination Title</label>
        <Input name="ttile" onChange={(e) => setTitle(e.target.value)} />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Description</label>
        <Input
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Start Date</label>
        <Input
          type="date"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>End Date</label>
        <Input
          type="date"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
        />
        {/* <HelperText /> */}
      </Stack>
      <Stack sx={{ margin: "1.2rem 0" }}>
        <label>Upload Image</label>
        <Input type="file" name="image" onChange={handleImageChange} />
        {/* <HelperText /> */}
      </Stack>
      <Button variant="contained" onClick={handleSubmit}>
        {status ? "loading..." : "Submit"}
      </Button>
    </FormControlUnstyled>
    // {/* </> */}
  );
};

export default OverViewForm;
