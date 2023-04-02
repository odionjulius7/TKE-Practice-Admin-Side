import Box from "@mui/material/Box";
import React from "react";
import { CommonButton, UserAvatar } from "../CommonComp";
import testImg from "../../img/test.jpeg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {};

const UserDetailsCard = (props: Props) => {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <div style={{ alignSelf: "flex-start", marginTop: "4rem" }}>
        <UserAvatar img={testImg} />
      </div>
      <Stack>
        <Stack>
          <Typography component="h6" variant="h6">
            Name: <span style={{ fontSize: "1.2rem" }}> Jude</span>
          </Typography>
        </Stack>
        <Stack>
          <Typography component="h6" variant="h6">
            Email: <span style={{ fontSize: "1.2rem" }}> jude@gmail.com</span>
          </Typography>
        </Stack>
        <Stack>
          <Typography component="h6" variant="h6">
            Phone Number: <span style={{ fontSize: "1.2rem" }}> 012345678</span>
          </Typography>
        </Stack>
        <CommonButton
          children={<Typography variant="h6">Edit User</Typography>}
          size="small"
          variant="contained"
          color="info"
        />
      </Stack>
    </Stack>
  );
};

export default UserDetailsCard;
