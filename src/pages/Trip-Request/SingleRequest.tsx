import React, { useEffect, useState } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge, SnackBar } from "../../components/CommonComp";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress, Divider } from "@mui/material";

import TripRequestList from "../../components/TripRequestTable/TripRequestList";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchSingleTripReq } from "../../Features/tripRequest/tripRequestSlice";

type Props = {};

const SingleRequest = (props: Props) => {
  const { loading } = useAppSelector((state) => state.tripRequests);
  const token = useAppSelector((state) => state.auth.token);
  const [open, setOpen] = useState<boolean>(true);
  let { id } = useParams(); // accept only type of string

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && token) {
      // Make sure the token is available before making the request
      // convert the id to string if it wasn't a string before
      id = id as string;
      const ids: { token: string; id: string } = { token, id };
      dispatch(fetchSingleTripReq(ids));
    }
  }, [id, token, dispatch]);

  // loading back dop circle
  const [openModal, setOpenModal] = React.useState(true);
  const handleToggle1 = () => {
    setOpenModal(!openModal);
  };
  // loading back dop circle
  if (loading)
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={openModal}
        // onClick={handleToggle1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  // loading back dop circle
  const message = (
    <React.Fragment>
      <em>View Trip Request details</em>
      <br />
      <em>Delete Trip Request If User Isn't Interested anymore</em> <br />
      <span>Mark As Seen When Trip Has Been Initiated</span> <br />
      <span>Use the details to create a user by clicking on Add User btn</span>
    </React.Fragment>
  );
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={4}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Single Trip Request
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
        <TripRequestList />
      </MainBody>
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </Grid>
  );
};

export default SingleRequest;
