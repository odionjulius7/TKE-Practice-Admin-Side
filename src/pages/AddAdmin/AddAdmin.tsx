import React from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";

import { Box, Divider } from "@mui/material";

type Props = {};

const AddAdmin = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={2}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>Add Admin</h2>
          </Grid>
          <Grid item xs={8}>
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
        <Box
              sx={{
                width: "100%",
                height: 300,
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                // backgroundColor: "primary.dark",
                // "&:hover": {
                //   backgroundColor: "primary.main",
                //   opacity: [0.9, 0.8, 0.7],
                // },
              }}
            ></Box>
      </MainBody>
    </Grid>
  );
};


export default AddAdmin;
