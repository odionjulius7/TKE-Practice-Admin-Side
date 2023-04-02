import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Backdrop,
  Box,
  createTheme,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CommonButton } from "../CommonComp";
import { useNavigate } from "react-router-dom";

type Props = {};
const data = {
  man: "man",
  woman: "woman",
  friends: "friends",
};

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
const TripRequestList = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  //
  const handleToggle1 = () => {
    setOpenModal(!openModal);
  };
  //
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        "& .css-hmaglg-MuiPaper-root": { maxWidth: "70%" },
      }}
    >
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary={
                  <CommonButton
                    children={"mark as seen"}
                    variant="contained"
                    onClick={() => {
                      handleToggle1();
                      // console.log("mark as seen");
                    }}
                  />
                }
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
              <ListItemText
                sx={{ my: 0 }}
                primary={
                  <CommonButton
                    children={"Add User"}
                    variant="outlined"
                    onClick={() => {
                      navigate("/user-trip-details");
                    }}
                  />
                }
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemText
                  primary="Trip Request Details"
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
              <Tooltip title="Delete Trip Request">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        // transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                  onClick={() => {
                    console.log("delete request");
                    handleToggle1();
                  }}
                >
                  <DeleteForeverIcon />
                  {/* <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  /> */}
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": {
                    "& svg": { opacity: open ? 1 : 0 },
                  },
                }}
              >
                <ListItemText
                  primary="Bespoke travels"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="Click Here to view Trip Request details and make the appropriate action to delete if user isn't interested or to mark as seen when trip has been approved"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
              {open && (
                <div>
                  <Divider sx={{ color: "red" }} />
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "#df9d9d" }}>
                      Friends:
                    </ListItemIcon>
                    <ListItemText
                      primary={data.friends}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                  <Divider sx={{ color: "red" }} />
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "#df9d9d" }}>
                      Friends:
                    </ListItemIcon>
                    <ListItemText
                      primary={data.man}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                  <Divider sx={{ color: "red" }} />
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "#df9d9d" }}>
                      Friends:
                    </ListItemIcon>
                    <ListItemText
                      primary={data.woman}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </div>
              )}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
        onClick={handleToggle1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default TripRequestList;

{
  /*
  const handleToggle = () => {
    setOpen(!open);
  };

   <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */
}
