import React, { useEffect, useState } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge, SnackBar } from "../../components/CommonComp";
import { Box, Divider } from "@mui/material";
import TripRequestTable from "../../components/TripRequestTable/TripRequestTable";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchTripRequests } from "../../Features/tripRequest/tripRequestSlice";
import { fetchAllTrip } from "../../Features/Trip/tripSlice";
import TripReqsChart from "../../components/Charts/TripReqsChart";

interface Props {
  // Define props for your component here
}

const Home: React.FC<Props> = (props) => {
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const { tripCount } = useAppSelector((state) => state.trips);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTripRequests());
    dispatch(fetchAllTrip());
  }, []);
  // snackBar
  const [open, setOpen] = useState<boolean>(true);
  const message = (
    <React.Fragment>
      <em>list of trip request table</em>
      <br />
      <em>
        you can click on individual request <br />
        to view details
      </em>
    </React.Fragment>
  );
  // snackBar
  return (
    <Grid container>
      <Grid item xs={12} md={2} lg={2}>
        <NavBar />
      </Grid>
      <SnackBar open={open} setOpen={setOpen} message={message} />
      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={10}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>Home</h2>
          </Grid>

          <Grid item xs={3}>
            <NotificationBadge
              badgeContent={requestCount}
              text="Total Number of Trip Request"
            />
            <NotificationBadge
              badgeContent={tripCount}
              text="Total Number of Trip"
            />
          </Grid>
        </TopNavBar>
        <Divider sx={{ margin: "2rem 0" }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <TripReqsChart />
            </Box>
          </Grid>
          <Grid item xs={6}>
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
            >
              Trip Graph
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "2rem 0" }} />
        <TripRequestTable />
      </MainBody>
    </Grid>
  );
};

export default Home;
