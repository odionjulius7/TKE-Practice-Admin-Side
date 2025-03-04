import React, { useEffect } from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";
import SearchBar from "../../components/CommonComp/SearchBar";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchUsers } from "../../Features/users/usersSlice";

/**
 * Displays a list of users with search functionality and notification badges.
 * Fetches user data on mount using the provided auth token.
 */
const Users: React.FC = () => {
  const { tripCount } = useAppSelector((state) => state.trips);
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, token]);

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
      <MainBody sx={{ ml: { md: "17.87%" }, width: { md: "80%" } }}>
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
            <Grid item xs={12} md={2}>
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
                Users
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <SearchBar
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    bgcolor: "#fff5f7",
                    "&:hover": { bgcolor: "#fef0f4" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f06292",
                    },
                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d81b60",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Poppins', sans-serif",
                    color: "#424242",
                  },
                }}
                placeholder="Search users by email or names"
                onchange={undefined} // Replace with actual handler if needed
              /> */}
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

        <Divider sx={{ my: 4, borderColor: "#e0e0e0", opacity: 0.7 }} />

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
          <UserTable />
        </Box>
      </MainBody>
    </Grid>
  );
};

export default Users;
