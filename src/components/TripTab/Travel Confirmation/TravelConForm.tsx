import * as React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

import { Button, Input, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Features/storeHook";
import { useState } from "react";
import { createTripConfirmation } from "../../../Features/Trip/tripSlice";

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
  return (
    <FormControlUnstyled defaultValue="" required>
      <Stack sx={{ margin: "0.5rem 0" }}>
        <label>Travel Title</label>
        <Input name="title" onChange={(e) => setTitle(e.target.value)} />
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
