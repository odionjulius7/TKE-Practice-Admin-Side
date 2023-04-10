import React, { useEffect, useState } from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge, SnackBar } from "../../components/CommonComp";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { createUser } from "../../Features/users/usersSlice";
// import { TripRequest } from "../../models/TripRequest.interface";
import { useParams } from "react-router-dom";
import { fetchSingleTripReq } from "../../Features/tripRequest/tripRequestSlice";
import moment from "moment";

type Props = {
  // requestUser: any;
};

const handleSubmit = () => console.log("Submit");

const AddUserFromTrip = (props: Props) => {
  // loading back dop circle
  const [openModal, setOpenModal] = React.useState(true);
  const [open, setOpen] = useState<boolean>(true);
  const { token } = useAppSelector((state) => state.auth);
  const { loading, singleTripReq } = useAppSelector(
    (state) => state.tripRequests
  );
  const { loadingUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  let { id } = useParams(); // accept only type of string
  console.log(singleTripReq);

  //
  const handleUserCreation = async () => {
    try {
      const user: any = {
        email: singleTripReq[0]?.user.email,
        firstName: singleTripReq[0]?.user.firstName,
        lastName: singleTripReq[0]?.user.lastName,
        gender: singleTripReq[0]?.user.gender,
        postCode: singleTripReq[0]?.user.postCode,
        phoneNumber: singleTripReq[0]?.user.phoneNumber,
        dateOfBirth: singleTripReq[0]?.user.dateOfBirth,
      };
      console.log(user);

      await dispatch(createUser({ user, token }));
    } catch (error) {
      console.log(error);
    }
  };

  const message = (
    <React.Fragment>
      <em>Register ths user </em> <br />
      <span>By clicking on submit</span>
    </React.Fragment>
  );
  useEffect(() => {
    if (id && token) {
      // Make sure the token is available before making the request
      // convert the id to string if it wasn't a string before
      id = id as string;
      const ids: { token: string; id: string } = { token, id };
      dispatch(fetchSingleTripReq(ids));
    }
  }, [id, token, dispatch]);

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
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={2}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Add Users
            </h2>
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
            paddingTop: "2rem",
            width: "100%",
            height: 400,
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              "&.css-wcxda5": {},
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.firstName}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.lastName}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </div>
            <div>
              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.gender}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />

              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.postCode}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={singleTripReq[0]?.user.phoneNumber}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </div>
            <div>
              {/*  */}
              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={moment(singleTripReq[0]?.user.dateOfBirth).format(
                  "ll"
                )}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              {/*  */}
              {/* <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue="First Name"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              /> */}
            </div>
            <Button variant="contained" onClick={handleUserCreation}>
              {loadingUser ? "loading" : "Submit"}
            </Button>
          </Box>
        </Box>
      </MainBody>

      <SnackBar open={open} setOpen={setOpen} message={message} />
    </Grid>
  );
};

export default AddUserFromTrip;
