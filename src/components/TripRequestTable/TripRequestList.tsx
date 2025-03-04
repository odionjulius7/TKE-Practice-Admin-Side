import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CommonButton } from "../CommonComp";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import {
  deleteTripRequest,
  markAsSeenTripRequest,
} from "../../Features/tripRequest/tripRequestSlice";

/**
 * Displays detailed information about a single trip request.
 * Allows admins to mark the request as seen, delete it, or add the user to the system.
 */
const TripRequestList: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { singleTripReq, loading } = useAppSelector(
    (state) => state.tripRequests
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handles deletion of the trip request
  const handleRequestDelete = async (id: string) => {
    if (id && token) {
      const ids = { token, id };
      try {
        await dispatch(deleteTripRequest(ids)).unwrap();
        navigate("/"); // Redirect to home on success
      } catch (error) {
        console.error("Failed to delete trip request:", error);
      }
    }
  };

  // Marks the trip request as seen
  const handleMarkAsSeen = async (id: string) => {
    if (id && token) {
      const ids = { token, id };
      try {
        await dispatch(markAsSeenTripRequest(ids)).unwrap();
        navigate("/"); // Redirect to home on success
      } catch (error) {
        console.error("Failed to mark trip request as seen:", error);
      }
    }
  };

  // Navigates to add user page with trip request details
  const handleAddUser = () => {
    if (singleTripReq[0]?._id) {
      navigate(`/user-trip-details/${singleTripReq[0]._id}`);
    }
  };

  // If no trip request data is available, show a placeholder
  if (!singleTripReq[0]) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No trip request data available.
        </Typography>
      </Box>
    );
  }

  // Ensure _id is a string (Prisma CUIDs are strings)
  const tripId = String(singleTripReq[0]._id);

  // Determine trip type and render accordingly
  const isBespoke = singleTripReq[0]?.tripType === "bespoke";
  const tripDetails = singleTripReq[0]?.tripDetails || {};
  const userDetails = singleTripReq[0]?.user || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: { xs: 2, md: 0 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "700px",
          width: "100%",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
        }}
      >
        {/* Header with Actions */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#fff5f7",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#d81b60",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
            }}
          >
            {isBespoke ? "Bespoke Trip Details" : "Standard Trip Details"}
          </Typography>
          <Stack direction="row" spacing={1}>
            <CommonButton
              children="Mark as Seen"
              variant="contained"
              onClick={() => handleMarkAsSeen(tripId)}
              sx={{
                bgcolor: "#ec407a",
                "&:hover": { bgcolor: "#d81b60" },
                borderRadius: "8px",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
              }}
            />
            <CommonButton
              children="Add User"
              variant="outlined"
              onClick={handleAddUser}
              sx={{
                color: "#ec407a",
                borderColor: "#ec407a",
                "&:hover": { borderColor: "#d81b60", color: "#d81b60" },
                borderRadius: "8px",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
              }}
            />
            <Tooltip title="Delete Trip Request">
              <IconButton
                onClick={() => handleRequestDelete(tripId)}
                sx={{
                  color: "#ef5350",
                  "&:hover": { color: "#d32f2f" },
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Trip Request Details List */}
        <List disablePadding>
          {/* User Details Section */}
          <ListItem sx={{ py: 1.5, px: 3 }}>
            <ListItemText
              primary="User Details"
              primaryTypographyProps={{
                variant: "subtitle1",
                color: "#424242",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
              }}
            />
          </ListItem>
          <Divider sx={{ mx: 3, borderColor: "#e0e0e0" }} />
          {[
            { label: "First Name", value: userDetails.firstName },
            { label: "Last Name", value: userDetails.lastName },
            { label: "Email", value: userDetails.email },
            { label: "Gender", value: userDetails.gender },
            { label: "Post Code", value: userDetails.postCode },
            { label: "User Type", value: userDetails.userType },
            { label: "Phone Number", value: userDetails.phoneNumber },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ py: 1, px: 3 }}>
                <ListItemText
                  primary={item.label}
                  secondary={item.value || "N/A"}
                  primaryTypographyProps={{
                    color: "#616161",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  secondaryTypographyProps={{
                    color: "#424242",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                  }}
                />
              </ListItem>
              <Divider sx={{ mx: 3, borderColor: "#e0e0e0" }} />
            </React.Fragment>
          ))}

          {/* Trip Details Section */}
          <ListItem sx={{ py: 1.5, px: 3 }}>
            <ListItemText
              primary="Trip Details"
              primaryTypographyProps={{
                variant: "subtitle1",
                color: "#424242",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
              }}
            />
          </ListItem>
          <Divider sx={{ mx: 3, borderColor: "#e0e0e0" }} />
          {isBespoke ? (
            <>
              {[
                {
                  label: "Set Date for Celebration",
                  value: tripDetails.setDateForCel,
                },
                {
                  label: "Occasion Celebrating",
                  value: tripDetails.occationYouAreCelebrating,
                },
                {
                  label: "What Are You Celebrating",
                  value: tripDetails.likeToCelebrateWhat,
                },
                {
                  label: "How Soon to Book",
                  value: tripDetails.howSoonDoYouWantToBook,
                },
                {
                  label: "Estimated Guests",
                  value: tripDetails.estimateGuestToCelebrateWith,
                },
                {
                  label: "Days to Spend",
                  value: tripDetails.daysToSpendCelebrating,
                },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 1, px: 3 }}>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value || "N/A"}
                      primaryTypographyProps={{
                        color: "#616161",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{
                        color: "#424242",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ mx: 3, borderColor: "#e0e0e0" }} />
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {[
                { label: "Destination", value: tripDetails.whereTo },
                { label: "City", value: tripDetails.whatCity },
                { label: "Traveling With", value: tripDetails.travelWithWho },
                { label: "Travel Purpose", value: tripDetails.travelForWhat },
                {
                  label: "Needs Visa",
                  value: tripDetails.needVisa ? "Yes" : "No",
                },
                {
                  label: "Adults Traveling",
                  value: tripDetails.numberOfTravellerAdult,
                },
                {
                  label: "Kids Traveling",
                  value: tripDetails.numberOfTravellerKids,
                },
                { label: "Ideal Month/Year", value: tripDetails.ideaMonthYear },
                {
                  label: "Days to Spend",
                  value: tripDetails.daysLikelyToSpend,
                },
                { label: "Travel Date", value: tripDetails.enterDateToTravel },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 1, px: 3 }}>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value || "N/A"}
                      primaryTypographyProps={{
                        color: "#616161",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{
                        color: "#424242",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ mx: 3, borderColor: "#e0e0e0" }} />
                </React.Fragment>
              ))}
            </>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default TripRequestList;
