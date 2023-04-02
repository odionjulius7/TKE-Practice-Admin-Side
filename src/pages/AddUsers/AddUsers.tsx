import React from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";

import { Box, Button, Divider, TextField } from "@mui/material";

type Props = {};

const handleSubmit = () => console.log("Submit");

const AddUsers = (props: Props) => {
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
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                id="outlined-search"
                label="First Name"
                type="search"
              />
              <TextField
                id="outlined-number"
                label="Last Name"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
              <TextField
                id="outlined-search"
                label="Date Of Birth"
                // type="date"
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                // defaultValue=""
              />

              <TextField
                id="outlined-number"
                label="Phone Number"
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
              <TextField
                id="outlined-search"
                label="Gender"
                // type="search"
              />
            </div>
            <div>
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
              />
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
              />
            </div>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </MainBody>
    </Grid>
  );
};

export default AddUsers;

{
  /* <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    /> */
}

{
  /* <Box
sx={{
  width: "100%",
  // height: 300,
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
}}
>
<Box
  component="form"
  sx={{
    "& .MuiTextField-root": { m: 1, width: "25ch" },
  }}
  noValidate
  autoComplete="off"
>
  <div>
    <TextField
      required
      id="outlined-required"
      label="Required"
      defaultValue="Hello World"
    />
    <TextField
      disabled
      id="outlined-disabled"
      label="Disabled"
      defaultValue="Hello World"
    />
    <TextField
      id="outlined-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
    />
    <TextField
      id="outlined-read-only-input"
      label="Read Only"
      defaultValue="Hello World"
      InputProps={{
        readOnly: true,
      }}
    />
    <TextField
      id="outlined-number"
      label="Number"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      id="outlined-search"
      label="Search field"
      type="search"
    />
    <TextField
      id="outlined-helperText"
      label="Helper text"
      defaultValue="Default Value"
      helperText="Some important text"
    />
  </div>
  <div>
    <TextField
      required
      id="filled-required"
      label="Required"
      defaultValue="Hello World"
      variant="filled"
    />
    <TextField
      disabled
      id="filled-disabled"
      label="Disabled"
      defaultValue="Hello World"
      variant="filled"
    />
    <TextField
      id="filled-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
    />
    <TextField
      id="filled-read-only-input"
      label="Read Only"
      defaultValue="Hello World"
      InputProps={{
        readOnly: true,
      }}
      variant="filled"
    />
    <TextField
      id="filled-number"
      label="Number"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="filled"
    />
    <TextField
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
    />
    <TextField
      id="filled-helperText"
      label="Helper text"
      defaultValue="Default Value"
      helperText="Some important text"
      variant="filled"
    />
  </div>
  <div>
    <TextField
      required
      id="standard-required"
      label="Required"
      defaultValue="Hello World"
      variant="standard"
    />
    <TextField
      disabled
      id="standard-disabled"
      label="Disabled"
      defaultValue="Hello World"
      variant="standard"
    />
    <TextField
      id="standard-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="standard"
    />
    <TextField
      id="standard-read-only-input"
      label="Read Only"
      defaultValue="Hello World"
      InputProps={{
        readOnly: true,
      }}
      variant="standard"
    />
    <TextField
      id="standard-number"
      label="Number"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="standard"
    />
    <TextField
      id="standard-search"
      label="Search field"
      type="search"
      variant="standard"
    />
    <TextField
      id="standard-helperText"
      label="Helper text"
      defaultValue="Default Value"
      helperText="Some important text"
      variant="standard"
    />
  </div>
</Box>
</Box> */
}
