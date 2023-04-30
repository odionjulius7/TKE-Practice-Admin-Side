import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { createUser } from "../../Features/users/usersSlice";

type Props = {};

const AddUsers = (props: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  const { loadingUser } = useAppSelector((state) => state.user);
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const { tripCount } = useAppSelector((state) => state.trips);

  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useAppDispatch();

  // snackBar
  const [open, setOpen] = useState<boolean>(true);
  // loading back dop circle
  const [openModal, setOpenModal] = React.useState(true);
  // loading back dop circle

  const handleUserCreation = async () => {
    try {
      if (
        email.length === 0 ||
        firstName.length === 0 ||
        gender.length === 0 ||
        dateOfBirth.length === 0
      )
        return;
      const user: any = {
        email,
        firstName,
        lastName,
        gender,
        postCode,
        phoneNumber,
        dateOfBirth,
      };
      console.log(user);

      await dispatch(createUser({ user, token }));
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingUser)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const message = (
    <React.Fragment>
      <em>Register ths user </em> <br />
      <span>Fill in the inputs </span>
    </React.Fragment>
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
            // onSubmit={handleSubmit}
          >
            <div>
              <TextField
                required
                id="outlined-search"
                label="First Name"
                name="firstName"
                type="search"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Last Name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                id="outlined-search"
                label="Date Of Birth"
                name="dateOfBirth"
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextField
                id="outlined-number"
                label="Date Of Birth"
                name="dateOfBirth"
                type="date"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              /> */}
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                name="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                required
                id="outlined-number"
                label="Phone Number"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                required
                id="outlined-search"
                label="Gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-search"
                label="Post Code"
                name="postCode"
                type="search"
                onChange={(e) => setPostCode(e.target.value)}
              />
            </div>
            <Button
              disabled={
                email.length === 0 ||
                firstName.length === 0 ||
                gender.length === 0 ||
                phoneNumber.length === 0 ||
                dateOfBirth.length === 0
              }
              variant="contained"
              onClick={handleUserCreation}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </MainBody>
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </Grid>
  );
};

export default AddUsers;
