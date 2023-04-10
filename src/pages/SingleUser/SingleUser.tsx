import React, { useEffect, useRef, useState } from "react";
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
} from "@mui/material";

import {
  BannerCard,
  UserDetailsCard,
} from "../../components/Single-User-Components";
import UserTripTable from "../../components/UserTripTable";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser } from "../../Features/users/usersSlice";
import { createTrip, resetTripId } from "../../Features/Trip/tripSlice";

type Props = {};

const SingleUser = (props: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  const { loadingUser, singleUser, bannerStatus } = useAppSelector(
    (state) => state.user
  );
  const { loadingTrip } = useAppSelector((state) => state.trips);
  const [open, setOpen] = useState<boolean>(true);
  let { email } = useParams(); // accept only type of string
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTrip = async () => {
    // (e: FormEvent<HTMLFormElement>)
    // e.preventDefault();
    dispatch(resetTripId());
    try {
      const _id = singleUser?._id as string;
      const token1 = token as string;
      const ids: { token1: string; _id: string } = {
        token1,
        _id,
      };
      await dispatch(createTrip(ids));
    } catch (error) {
      console.log(error);
    }
  };

  //

  useEffect(() => {
    if (email && token) {
      // Make sure the token is available before making the request
      // convert the id to string if it wasn't a string before
      email = email as string;
      const ids: { token: string; email: string } = { token, email };
      dispatch(fetchSingleUser(ids));
    }
  }, [email, token, bannerStatus]);

  // loading back dop circle
  const [openModal, setOpenModal] = React.useState(true);
  // loading back dop circle
  if (loadingUser)
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

  const message = (
    <React.Fragment>
      <em>
        Add Ads Place
        <br /> banner for user
      </em>
      <em>Create a trip</em>
      <br />
      <em>
        fill in details for <br />
        the created trip
      </em>
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
              {singleUser?.firstName}
            </h2>
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
              <UserDetailsCard user={singleUser} />
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
              <BannerCard user={singleUser} />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "2rem 0" }} />
        <Box>
          <Button variant="outlined" onClick={() => handleTrip()}>
            {loadingTrip ? "loading" : "Create New Trip"}
          </Button>
        </Box>
        <UserTripTable _id={singleUser?._id} />
      </MainBody>
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </Grid>
  );
};

export default SingleUser;
