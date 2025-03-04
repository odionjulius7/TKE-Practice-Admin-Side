import React, { useEffect, useState } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge, SnackBar } from "../../components/CommonComp";
import { useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import TripRequestList from "../../components/TripRequestTable/TripRequestList";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchSingleTripReq } from "../../Features/tripRequest/tripRequestSlice";

const SingleRequest: React.FC = () => {
  const { loading, requestCount } = useAppSelector(
    (state) => state.tripRequests
  );
  const { tripCount } = useAppSelector((state) => state.trips);
  const token = useAppSelector((state) => state.auth.token);
  const [snackOpen, setSnackOpen] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>(); // Explicitly type id as string
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && token) {
      const ids = { token, id };
      dispatch(fetchSingleTripReq(ids));
    }
  }, [id, token, dispatch]);

  // Loading State
  if (loading) {
    return (
      <Backdrop
        sx={{
          color: "#ec407a", // Pink loader
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" size={50} thickness={4} />
      </Backdrop>
    );
  }

  const snackMessage = (
    <React.Fragment>
      <em>View Trip Request Details</em>
      <br />
      <em>Delete if the user isn’t interested</em>
      <br />
      <em>Mark as seen when trip starts</em>
      <br />
      <em>Create a user from details with Add User</em>
    </React.Fragment>
  );

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          bgcolor: "#ffffff",
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
          position: { xs: "relative", md: "fixed" },
          height: { xs: "auto", md: "100vh" },
          zIndex: 1200,
        }}
      >
        <NavBar />
      </Grid>

      {/* Main Content */}
      <MainBody sx={{ ml: { md: "18.67%" }, width: { md: "80%" } }}>
        <TopNavBar
          sx={{
            bgcolor: "#ffffff",
            p: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            borderRadius: "12px",
            mb: 3,
            display: "flex",
            alignItems: "center",
            transition: "box-shadow 0.3s ease",
            "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{
                  color: "#d81b60", // Vibrant pink
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  textAlign: { xs: "center", md: "left" },
                  ml: { md: 2 },
                }}
              >
                Trip Request Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-end" }}
                sx={{ pr: { md: 2 } }}
              >
                <NotificationBadge
                  badgeContent={requestCount}
                  text="Trip Requests"
                />
                <NotificationBadge
                  badgeContent={tripCount}
                  text="Completed Trips"
                />
              </Stack>
            </Grid>
          </Grid>
        </TopNavBar>

        <Divider sx={{ mb: 2, borderColor: "#e0e0e0", opacity: 0.7 }} />

        {/* <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 3,
            transition: "box-shadow 0.3s ease",
            "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
          }}
        > */}
        <TripRequestList />
        {/* </Box> */}
      </MainBody>

      {/* <SnackBar
        open={snackOpen}
        setOpen={setSnackOpen}
        message={snackMessage}
        autoHideDuration={6000}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: "#fff5f7",
            color: "#d81b60",
            fontFamily: "'Poppins', sans-serif",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }}
      /> */}
    </Grid>
  );
};

export default SingleRequest;
