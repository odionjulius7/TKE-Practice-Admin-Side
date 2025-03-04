import React from "react";
import { Grid, Box, TextField, Button, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Add sx prop with MUI's type
};

const MainBody: React.FC<Props> = ({ children, sx }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    console.log("Search query:", value); // Replace with your search logic
  };

  return (
    <Grid
      item
      xs={11}
      md={10}
      lg={10}
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f5f7fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        ...sx, // Spread the passed sx prop
      }}
    >
      {/* Search Bar and Button Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
          bgcolor: "#ffffff",
          p: 2,
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          marginLeft: "10px",
        }}
      >
        <TextField
          placeholder="Search by user email address or phone number"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "& fieldset": { borderColor: "#f06292" },
              "&:hover fieldset": { borderColor: "#ec407a" },
              "&.Mui-focused fieldset": { borderColor: "#d81b60" },
            },
            "& .MuiInputBase-input": {
              fontFamily: "'Poppins', sans-serif",
              color: "#424242",
            },
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#f06292", mr: 1 }} />,
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ec407a",
            "&:hover": { bgcolor: "#d81b60" },
            borderRadius: "12px",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "none",
            px: 3,
            py: 1,
            flexShrink: 0,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Grid>
  );
};

export default MainBody;
