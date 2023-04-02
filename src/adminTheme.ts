import { createTheme } from "@mui/material/styles";

// setting th base/root style of any Mui component but you can over ride it with sx={} he componnt itself
export const adminTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: 8.5,
          margin: "1rem",
          "&.MuiButton-contained": {
            backgroundColor: "#009be5",
            "&:hover": {
              backgroundColor: "#006db3",
            },
          },
          "&.MuiButton-outlined": {
            color: "#000",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
  },
});
