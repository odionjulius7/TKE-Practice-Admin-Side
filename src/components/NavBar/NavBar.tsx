import React from "react";
import { Toolbar, Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import NavBarList from "./NavBarList";
import { navBarstyles } from "./stylesMui";
import adminLogo from "../../assets/tke-logo.png"; // Ensure path is correct

/**
 * A permanent sidebar navigation drawer for the admin panel.
 * Displays a logo, title, and navigation list with a modern, user-friendly design.
 */
const NavBar: React.FC = () => {
  return (
    <Drawer
      sx={{
        ...navBarstyles.drawer, // Merge existing styles
        "& .MuiDrawer-paper": {
          bgcolor: "#ffffff", // White background
          borderRight: "none", // Remove default border
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)", // Subtle shadow
          width: { xs: "100%", md: 240 }, // Full-width mobile, fixed on desktop
          transition: "width 0.3s ease", // Smooth width transition
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px 10px",
          mt: { xs: 1, md: 2 }, // Responsive top margin
          mb: { xs: 2, md: 4 }, // Responsive bottom margin
          bgcolor: "#fff5f7", // Soft pink header
          borderBottom: "1px solid #f8bbd0", // Light pink border
          transition: "background-color 0.3s ease", // Smooth bg transition
          "&:hover": {
            bgcolor: "#fef0f4", // Slightly darker on hover
          },
        }}
      >
        <Box
          component="img"
          src={adminLogo}
          alt="Admin Logo"
          sx={{
            height: { xs: 35, md: 45 }, // Responsive logo size
            mr: 2, // Margin right for spacing
            transition: "transform 0.3s ease", // Smooth scale on hover
            "&:hover": {
              transform: "scale(1.1)", // Slight scale-up effect
            },
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#d81b60", // Vibrant pink
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: { xs: "1rem", md: "1.25rem" }, // Responsive font size
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider
        sx={{
          borderColor: "#e0e0e0", // Subtle gray
          opacity: 0.7,
          mx: 2, // Horizontal margin for inset effect
        }}
      />
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <NavBarList />
      </Box>
    </Drawer>
  );
};

export default NavBar;
