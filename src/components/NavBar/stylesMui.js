export const navBarstyles = {
  drawer: {
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      height: "95vh",
      boxSizing: "border-box",
      backgroundColor: "#131618", //"#2c3e50", // Updated background color
      color: "#ecf0f1", // Updated text color
      borderRadius: "8px", // Added border radius
      boxShadow: "4px 7px 15px rgba(0, 0, 0, 0.35)", // Added box shadow
      margin: "0.8rem 0.4rem",
    },
    "& .Mui-selected": {
      color: "red",
    },
  },
  icons: {
    color: "rgba(255,255,255,0.7) !important",
    marginLeft: "20px !important",
  },
  text: {
    "& span": {
      marginLeft: "-10px",
      fontWeight: "600",
      fontSize: "16px",
    },
  },
  textHover: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      cursor: "pointer",
    },
  },
};
