// import React, { useEffect } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { NotificationBadge } from "../../components/CommonComp";

import { Divider } from "@mui/material";
import { TabMenu } from "../../components/TripTab";
import { useAppSelector } from "../../Features/storeHook";

type Props = {};

const SingleTrip = (props: Props) => {
  const { tripCount } = useAppSelector((state) => state.trips);
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={4}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Single Trip
            </h2>
          </Grid>
          <Grid item xs={6}>
            &nbsp;
          </Grid>

          <Grid item xs={3}>
            <NotificationBadge
              badgeContent={0}
              text="Total Number of Trip Request"
            />
            <NotificationBadge
              badgeContent={tripCount}
              text="Total Number of Trip"
            />
          </Grid>
        </TopNavBar>

        <Divider sx={{ margin: "2rem 0" }} />
        <TabMenu />
      </MainBody>
    </Grid>
  );
};

export default SingleTrip;
// function dispatch(
//   arg0: AsyncThunkAction<
//     any,
//     { id: string; token: string },
//     {
//       state?: unknown;
//       dispatch?: Dispatch<AnyAction> | undefined;
//       extra?: unknown;
//       rejectValue?: unknown;
//       serializedErrorType?: unknown;
//       pendingMeta?: unknown;
//       fulfilledMeta?: unknown;
//       rejectedMeta?: unknown;
//     }
//   >
// ) {
//   throw new Error("Function not implemented.");
// }
