import React from "react";
import { NavBar, TopNavBar, TripRequestTable01 } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Divider } from "@mui/material";

type Props = {};

const TripQuest = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={10}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Trip Request
            </h2>
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
        <TripRequestTable01 />
      </MainBody>
    </Grid>
  );
};

export default TripQuest;
