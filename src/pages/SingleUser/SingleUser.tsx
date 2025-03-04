import React, { useEffect, useState } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge, SnackBar } from "../../components/CommonComp";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  BannerCard,
  UserDetailsCard,
} from "../../components/Single-User-Components";
import UserTripTable from "../../components/UserTripTable";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "../../Features/users/usersSlice";
import { createTrip, resetTripId } from "../../Features/Trip/tripSlice";

/**
 * Displays details of a single user, including their profile, banner, and trip history.
 * Allows creating new trips for the user.
 */
const SingleUser: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { loadingUser, singleUser, bannerStatus } = useAppSelector(
    (state) => state.user
  );
  const { loadingTrip } = useAppSelector((state) => state.trips);
  const [snackOpen, setSnackOpen] = useState<boolean>(true);
  const { email } = useParams<{ email: string }>();
  const dispatch = useAppDispatch();

  const handleTrip = async () => {
    dispatch(resetTripId());
    if (singleUser?._id && token) {
      const ids = { token1: token, _id: singleUser._id };
      try {
        await dispatch(createTrip(ids)).unwrap();
      } catch (error) {
        console.log("Failed to create trip:", error);
      }
    }
  };

  useEffect(() => {
    if (email && token) {
      const ids = { token, email };
      dispatch(fetchSingleUser(ids));
    }
  }, [email, token, bannerStatus, dispatch]);

  // Loading State
  if (loadingUser) {
    return (
      <Backdrop
        sx={{
          color: "#ec407a",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
        open={loadingUser}
      >
        <CircularProgress color="inherit" size={50} thickness={4} />
      </Backdrop>
    );
  }

  const snackMessage = (
    <React.Fragment>
      <em>Add banner for user</em>
      <br />
      <em>Create a trip</em>
      <br />
      <em>Fill in trip details</em>
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
      <MainBody sx={{ ml: { md: "18.5%" }, width: { md: "70%" } }}>
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
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{
                  color: "#d81b60",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  textAlign: { xs: "center", md: "left" },
                  ml: { md: 2 },
                }}
              >
                {singleUser?.firstName || "User Details"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} />
            <Grid item xs={12} md={3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-end" }}
                sx={{ pr: { md: 2 } }}
              >
                <NotificationBadge badgeContent={2} text="Upcoming Trips" />
                <NotificationBadge badgeContent={3} text="Total Trips" />
              </Stack>
            </Grid>
          </Grid>
        </TopNavBar>

        <Divider sx={{ mb: 2, borderColor: "#e0e0e0", opacity: 0.7 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                p: 3,
                height: 300,
                transition: "box-shadow 0.3s ease",
                "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
              }}
            >
              <UserDetailsCard user={singleUser} />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                p: 3,
                height: 300,
                transition: "box-shadow 0.3s ease",
                "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
              }}
            >
              <BannerCard user={singleUser} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#e0e0e0", opacity: 0.7 }} />

        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleTrip}
            disabled={loadingTrip}
            sx={{
              bgcolor: "#ec407a",
              "&:hover": { bgcolor: "#d81b60" },
              "&:disabled": { bgcolor: "#f8bbd0", cursor: "not-allowed" },
              borderRadius: "8px",
              fontFamily: "'Poppins', sans-serif",
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              transition: "transform 0.2s ease",
              "&:not(:disabled):hover": { transform: "scale(1.05)" },
            }}
          >
            {loadingTrip ? "Creating..." : "Create New Trip"}
          </Button>
        </Box>

        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 3,
            transition: "box-shadow 0.3s ease",
            "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
          }}
        >
          <UserTripTable _id={singleUser?._id || ""} />
        </Box>
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

export default SingleUser;
