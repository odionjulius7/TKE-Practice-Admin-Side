import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTableUser from "./DataTable/DataTableUser"; // Use DataTableUser as intended
import { Button, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../Features/storeHook";
import { fetchAUsersTrip } from "../Features/Trip/tripSlice";
import moment from "moment";

const tableStylesx = { height: 450, width: "100%" };

// Subset of Trips interface for table display
interface TableTrip {
  _id: string;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

/**
 * Displays a table of trips for a specific user, with clickable titles linking to trip details.
 * Fetches trip data based on user ID and token.
 * @param {string} _id - The user's unique ID
 */
const UserTripTable: React.FC<{ _id: string }> = ({ _id }) => {
  const token = useAppSelector((state) => state.auth.token);
  const { usertrips, createdTripId, loadingTrip } = useAppSelector(
    (state) => state.trips
  );
  const [tableTrip, setTableTrip] = useState<TableTrip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false); // Track fetch status
  const dispatch = useAppDispatch();

  console.log("usertrips:", usertrips);

  useEffect(() => {
    if (_id && token) {
      setLoadingTrips(true); // Start loading
      const ids = { token, _id };
      dispatch(fetchAUsersTrip(ids)).finally(() => setLoadingTrips(false)); // End loading
    }
  }, [_id, token, createdTripId, dispatch]);

  useEffect(() => {
    if (Array.isArray(usertrips)) {
      const tripProps: TableTrip[] = usertrips.map((trip) => ({
        _id: String(trip._id),
        id: String(trip._id),
        title: trip.overview?.title || "",
        startDate: trip.overview?.startDate
          ? moment(trip.overview.startDate).format("ll")
          : "N/A",
        endDate: trip.overview?.endDate
          ? moment(trip.overview.endDate).format("ll")
          : "N/A",
      }));
      setTableTrip(tripProps);
    }
  }, [usertrips]);

  function CustomLinkCell({ value, title }: { value: string; title: string }) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/trip/${value}`);
    }

    return (
      <Button
        onClick={handleClick}
        sx={{
          textTransform: "none",
          color: "#ec407a",
          "&:hover": { color: "#d81b60" },
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
        }}
      >
        {!title ? "Fill Trip Details" : "View Trip"}
      </Button>
    );
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <CustomLinkCell value={params.row.id} title={params.row.title || ""} />
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      editable: true,
    },
    { field: "endDate", headerName: "End Date", width: 200, editable: true },
  ];

  // Show empty state if no trips and not loading
  if (!loadingTrips && tableTrip.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#757575",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
          }}
        >
          No trips available for this user.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          color: "#424242",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
        }}
      >
        User Trips
      </Typography>
      <DataTableUser
        rows={tableTrip}
        columns={columns}
        loading={loadingTrips} // Use loadingTrips instead of !tableTrip.length
        sx={{
          ...tableStylesx,
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "12px",
            bgcolor: "#fafafa",
            "& .MuiDataGrid-cell": {
              color: "#424242",
              fontFamily: "'Poppins', sans-serif",
              "&:hover": { bgcolor: "#f5f5f5" },
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                bgcolor: "#e0f7fa",
                transition: "background-color 0.2s ease",
              },
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#5e35b1",
              color: "#ffffff",
              fontFamily: "'Poppins', sans-serif",
              "& .MuiDataGrid-columnSeparator": { display: "none" },
            },
            "& .MuiDataGrid-footerContainer": {
              bgcolor: "#fafafa",
              borderTop: "1px solid #e0e0e0",
            },
          },
        }}
      />
    </Box>
  );
};

export default UserTripTable;
