import React, { useEffect } from "react";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchSingleTrip } from "../../Features/Trip/tripSlice";
import {
  PaymentList,
  OverViewForm,
  OverViewList,
  FlightDetailsForm,
  FlightDetailsList,
  AgreementList,
  AgreementForm,
  PaymentForm,
  TravelConForm,
  TravelConList,
  VisaForm,
  VisaList,
} from ".";
import ItineraryTab from "./ItineraryTab";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  width: 97%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #152e4e;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

type Props = {};

const TabMenu = (props: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  const { singleTrip, status } = useAppSelector((state) => state.trips);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // console.log(id);
  // console.log(singleTrip?.overview);

  useEffect(() => {
    if (id && token) {
      // Make sure the token is available before making the request
      // convert the id to string if it wasn't a string before
      // let idm = id as string;
      const ids: { token: string; id: string } = { token, id };
      dispatch(fetchSingleTrip(ids));
    }
  }, [id, token, dispatch, status]);
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Over View</Tab>
        <Tab>Flight Details</Tab>
        <Tab>Agreement</Tab>
        <Tab>Payment</Tab>
        <Tab>Travel Confrmation</Tab>
        <Tab>Visa</Tab>
        <Tab>Itineray</Tab>
        <Tab>Trip Review</Tab>
      </TabsList>
      <TabPanel value={0}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <OverViewForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <OverViewList overview={singleTrip?.overview} />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={1}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 200,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <FlightDetailsForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <FlightDetailsList
              flight={singleTrip?.flightDetails}
              id={singleTrip?._id}
            />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={2}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "40%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <AgreementForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <AgreementList
              agreement={singleTrip?.agreements}
              id={singleTrip?._id}
            />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={3}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "40%",
              height: 400,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <PaymentForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <PaymentList payment={singleTrip?.payment} id={singleTrip?._id} />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={4}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 200,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <TravelConForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <TravelConList
              travelConfirmation={singleTrip?.travelConfirmation}
              id={singleTrip?._id}
            />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={5}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 200,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <VisaForm id={singleTrip?._id} />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <VisaList visa={singleTrip?.visa} id={singleTrip?._id} />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={6}>
        <Box
          sx={{
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            minHeight: "200px",
          }}
        >
          <ItineraryTab id={singleTrip?._id} />
        </Box>
      </TabPanel>
      <TabPanel value={7}>
        <Box
          sx={{
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
          }}
        >
          7
        </Box>
      </TabPanel>
      {/* <TabPanel value={8}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            16
          </Box>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              // backgroundColor: "primary.dark",
              // "&:hover": {
              //   backgroundColor: "primary.main",
              //   opacity: [0.9, 0.8, 0.7],
              // },
            }}
          >
            17
          </Box>
        </div>
      </TabPanel> */}
    </TabsUnstyled>
  );
};

export default TabMenu;
