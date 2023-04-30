import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

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
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import {
  deleteTripRequest,
  markAsSeenTripRequest,
} from "../../Features/tripRequest/tripRequestSlice";

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
  let token = useAppSelector((state) => state.auth.token);
  const { singleTripReq, loading } = useAppSelector(
    (state) => state.tripRequests
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //
  const handleRequestDelete = async (id: string) => {
    if (id && token) {
      id = id as string;
      const ids: { token: string; id: string } = { token, id };
      try {
        await dispatch(deleteTripRequest(ids));
        // If the dispatch call above is successful, we can redirect to the home page
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleMarkAsSeen = async (id: string) => {
    if (id && token) {
      id = id as string;
      const ids: { token: string; id: string } = { token, id };
      try {
        await dispatch(markAsSeenTripRequest(ids));
        // If the dispatch call above is successful, we can redirect to the home page
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  //
  const handleAddUser = async () => {
    navigate(`/user-trip-details/${singleTripReq[0]?._id.toString()}`);
  };
  //
  // console.log(singleTripReq[0]);

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(loading);

  const handleToggle1 = () => {
    setOpenModal(!openModal);
  };
  //

  if (singleTripReq[0]?.tripType === "bespoke") {
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
          <Paper elevation={0} sx={{ maxWidth: "650px" }}>
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
                        handleMarkAsSeen(singleTripReq[0]?._id.toString());
                        console.log("mark as seen");
                        // handleToggle1();
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
                    <CommonButton variant="outlined" onClick={handleAddUser}>
                      Add User
                    </CommonButton>
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
                      handleRequestDelete(singleTripReq[0]?._id.toString());
                      console.log("delete request");
                      // handleToggle1();
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
                    primary={`${singleTripReq[0]?.tripType} travels`}
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
                        First Name:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.firstName}
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
                        Email:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.email}
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
                        Last Name:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.lastName}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />

                      <Divider sx={{ color: "red" }} />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "#df9d9d" }}>
                        Gender:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.gender}
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
                        Post Code:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.postCode}
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
                        User Type:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.userType}
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
                        Phone Num:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.user.phoneNumber}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                    <h3 style={{ margin: "1rem 0.5rem" }}>Request Type </h3>
                    <Divider sx={{ color: "red" }} />
                    <ListItemButton
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "#df9d9d" }}>
                        Where To:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.tripDetails.whereTo}
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
                        City:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.tripDetails.whatCity}
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
                        Travelling With Who:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.tripDetails.travelWithWho}
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
                        Travelling For What:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.tripDetails.travelForWhat}
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
                        Need Visa:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.needVisa ? "Yes" : "No"
                        }
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
                        Num. Adults Travelling:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.numberOfTravellerAdult
                        }
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
                        Num. Kids Travelling:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.numberOfTravellerKids
                        }
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
                        Ideal Month Or Year:
                      </ListItemIcon>
                      <ListItemText
                        primary={singleTripReq[0]?.tripDetails.ideaMonthYear}
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
                        Days Likely To Spend:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.daysLikelyToSpend
                        }
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
                        Travel Date:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.enterDateToTravel
                        }
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
                        Travel Date:
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          singleTripReq[0]?.tripDetails.enterDateToTravel
                        }
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                    <Divider sx={{ color: "red" }} />
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
  }

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
        <Paper elevation={0} sx={{ maxWidth: "650px" }}>
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
                      handleMarkAsSeen(singleTripReq[0]?._id.toString());
                      console.log("mark as seen");
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
                  <CommonButton variant="outlined" onClick={handleAddUser}>
                    Add User
                  </CommonButton>
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
                    handleRequestDelete(singleTripReq[0]?._id.toString());
                    console.log("delete request");
                    // handleToggle1();
                  }}
                >
                  <DeleteForeverIcon />
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
                  primary={`${singleTripReq[0]?.tripType} travels`}
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
                      First Name:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.firstName}
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
                      Email:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.email}
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
                      Last Name:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.lastName}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />

                    <Divider sx={{ color: "red" }} />
                  </ListItemButton>
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "#df9d9d" }}>
                      Gender:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.gender}
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
                      Post Code:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.postCode}
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
                      User Type:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.userType}
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
                      Phone Num:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.user.phoneNumber}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                  <h3 style={{ margin: "1rem 0.5rem" }}>Request Type </h3>
                  <Divider sx={{ color: "red" }} />
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "#df9d9d" }}>
                      Set Date For Celebration:
                    </ListItemIcon>
                    <ListItemText
                      primary={singleTripReq[0]?.tripDetails.setDateForCel}
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
                      Occation Celebrating:
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        singleTripReq[0]?.tripDetails.occationYouAreCelebrating
                      }
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
                      What Are Celebarting:
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        singleTripReq[0]?.tripDetails.likeToCelebrateWhat
                      }
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
                      How Soon Are You Likely To Book:
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        singleTripReq[0]?.tripDetails.howSoonDoYouWantToBook
                      }
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
                      Estimate Num. Guest:
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        singleTripReq[0]?.tripDetails
                          .estimateGuestToCelebrateWith
                      }
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
                      Num. Days Likely To Spend:
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        singleTripReq[0]?.tripDetails.daysToSpendCelebrating
                      }
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                  <Divider sx={{ color: "red" }} />
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
