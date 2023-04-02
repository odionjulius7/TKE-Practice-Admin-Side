import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  message: React.ReactNode;
  open: boolean;
  setOpen: any;
};

const SnackBar = ({ open, setOpen, message }: Props) => {
  // const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button sx={{}} onClick={handleClick}></Button> */}
      <Snackbar
        open={open}
        autoHideDuration={40000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default SnackBar;
