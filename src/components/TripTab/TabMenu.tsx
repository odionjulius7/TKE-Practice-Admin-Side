import React from "react";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

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
  width: 100%;
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
            <OverViewForm />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: 150,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <OverViewList />
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
            <FlightDetailsForm />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <FlightDetailsList />
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
            <AgreementForm />
          </Box>
          <Box
            sx={{
              width: "60%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <AgreementList />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={3}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "40%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <PaymentForm />
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <PaymentList />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={4}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 150,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <TravelConForm />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "auto",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem 0",
            }}
          >
            <TravelConList />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={5}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <VisaForm />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            <VisaList />
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={6}>
        <Box
          sx={{
            width: "100%",
            height: 300,
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
          }}
        >
          13
        </Box>
      </TabPanel>
      <TabPanel value={7}>
        <div style={{ display: "flex", width: "100%", gap: "2rem" }}>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            14
          </Box>
          <Box
            sx={{
              width: "50%",
              height: 300,
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              padding: "2rem",
            }}
          >
            15
          </Box>
        </div>
      </TabPanel>
      <TabPanel value={8}>
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
      </TabPanel>
    </TabsUnstyled>
  );
};

export default TabMenu;
