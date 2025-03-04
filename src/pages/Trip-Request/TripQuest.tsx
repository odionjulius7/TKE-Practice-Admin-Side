import React from "react";
import { NavBar, TopNavBar, TripRequestTable01 } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";

const TripQuest: React.FC = () => {
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const { tripCount } = useAppSelector((state) => state.trips);

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
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

      <MainBody sx={{ ml: { md: "18.67%" }, width: { md: "80.33%" } }}>
        <TopNavBar
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#ffffff",
            p: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            borderRadius: "12px",
            mb: 3,
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{
                  color: "#424242",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  textAlign: { xs: "center", md: "left" },
                  ml: { md: 2 },
                }}
              >
                Trip Requests
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
                  // badgeColor="#ec407a"
                  // sx={{
                  //   bgcolor: "#fff5f7",
                  //   borderRadius: "8px",
                  //   p: 1,
                  //   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  // }}
                />
                <NotificationBadge
                  badgeContent={tripCount}
                  text="Completed Trips"
                  // badgeColor="#f06292"
                  // sx={{
                  //   bgcolor: "#fff5f7",
                  //   borderRadius: "8px",
                  //   p: 1,
                  //   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  // }}
                />
              </Stack>
            </Grid>
          </Grid>
        </TopNavBar>

        <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />

        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 3,
          }}
        >
          <TripRequestTable01 />
        </Box>
      </MainBody>
    </Grid>
  );
};

export default TripQuest;
