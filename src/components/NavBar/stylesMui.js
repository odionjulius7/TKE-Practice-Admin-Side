export const navBarstyles = {
  drawer: {
    // width: "100% !important",
    // maxWidth: 350,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
      backgroundColor: "#101f33",
      color: "rgba(255,255,255,0.7)",
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
