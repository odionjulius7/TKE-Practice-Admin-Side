import React from "react";
import {
  Snackbar,
  SnackbarProps,
  Button,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends SnackbarProps {
  message: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  autoHideDuration?: number; // Added from SingleRequest usage
  sx?: SxProps<Theme>; // Added for custom styling
}

const SnackBar: React.FC<Props> = ({
  open,
  setOpen,
  message,
  autoHideDuration = 4000, // Default matches your original
  sx,
  ...snackbarProps
}) => {
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
      <Button
        color="inherit"
        size="small"
        onClick={handleClose}
        sx={{ color: "#d81b60", fontFamily: "'Poppins', sans-serif" }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        sx={{ "&:hover": { color: "#ec407a" } }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      message={message}
      action={action}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Centered top for visibility
      sx={{
        "& .MuiSnackbarContent-root": {
          bgcolor: "#fff5f7", // Soft pink background
          color: "#d81b60", // Vibrant pink text
          fontFamily: "'Poppins', sans-serif",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          p: 1.5,
        },
        ...sx, // Allow external styling overrides
      }}
      {...snackbarProps} // Spread additional SnackbarProps
    />
  );
};

export default SnackBar;
