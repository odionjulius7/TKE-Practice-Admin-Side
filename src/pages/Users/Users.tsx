import React, { useEffect } from "react";
import { NavBar, TopNavBar, UserTable } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";
import { Divider } from "@mui/material";
import SearchBar from "../../components/CommonComp/SearchBar";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchUsers } from "../../Features/users/usersSlice";

type Props = {};

const Users = (props: Props) => {
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, token]);

  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={2}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>Users</h2>
          </Grid>
          <Grid item xs={8}>
            {/* <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>Users</h2> */}
            <SearchBar
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100% !important",
              }}
              placeholder={"Search users by email or names"}
              onchange={undefined}
            />
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
        <UserTable />
      </MainBody>
    </Grid>
  );
};

export default Users;
