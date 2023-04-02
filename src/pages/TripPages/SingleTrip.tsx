import React from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";

import { Box, Divider } from "@mui/material";
import { TabMenu } from "../../components/TripTab";

type Props = {};

const SingleTrip = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={4}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Single Trip
            </h2>
          </Grid>
          <Grid item xs={6}>
            &nbsp;
          </Grid>

          <Grid item xs={3}>
            <NotificationBadge
              badgeContent={2}
              text="Total Number of Trip Request"
            />
            <NotificationBadge badgeContent={3} text="Total Number of Trip" />
          </Grid>
        </TopNavBar>

        <Divider sx={{ margin: "2rem 0" }} />
        <TabMenu />
      </MainBody>
    </Grid>
  );
};

export default SingleTrip;
