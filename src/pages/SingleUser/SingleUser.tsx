import React from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";

import { Box, Divider } from "@mui/material";
import {
  BannerCard,
  UserDetailsCard,
} from "../../components/Single-User-Components";
import UserTripTable from "../../components/UserTripTable";

type Props = {};

const SingleUser = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={4}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>User</h2>
          </Grid>
          <Grid item xs={6}>
            &nbsp;
          </Grid>

          <Grid item xs={3}>
            <NotificationBadge badgeContent={2} text="Total Upcoming Trip" />
            <NotificationBadge badgeContent={3} text="Total Number of Trip" />
          </Grid>
        </TopNavBar>

        <Divider sx={{ margin: "2rem 0" }} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={7}>
            {" "}
            <Box
              sx={{
                height: 300,
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                gap: "5rem",
              }}
            >
              <UserDetailsCard />
            </Box>
          </Grid>
          <Grid item xs={6} md={5}>
            {" "}
            <Box
              sx={{
                height: 300,
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <BannerCard />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "2rem 0" }} />
        <UserTripTable />
      </MainBody>
    </Grid>
  );
};

export default SingleUser;
