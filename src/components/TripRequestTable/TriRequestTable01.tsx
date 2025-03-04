import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button, Box, Typography } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";

const tableStylesx = { height: 450, width: "100%" };

interface TripRequest {
  _id: string; // Prisma CUID
  id: number; // Convert to number for DataTable
  createdAt?: string;
  status?: string;
  email?: string;
  name?: string;
  tripType?: string;
  userType?: string;
}

const TriRequestTable01: React.FC = () => {
  const [user1, setUser1] = useState<TripRequest[]>([]);
  const tripRequests = useAppSelector(
    (state) => state.tripRequests.tripRequests
  );

  function CustomLinkCell({ value, name }: { value: string; name: string }) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/request/${value}`);
    }

    return (
      <Button onClick={handleClick} sx={{ textTransform: "none" }}>
        {name}
      </Button>
    );
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Index", width: 90 }, // Renamed to clarify it’s an index
    {
      field: "name",
      headerName: "Trip Name",
      width: 120,
      editable: true,
      renderCell: (params) => (
        <CustomLinkCell value={params.row._id} name={params.row.name || ""} /> // Use _id for navigation
      ),
    },
    { field: "email", headerName: "Email", width: 150, editable: true },
    { field: "tripType", headerName: "Trip Type", width: 150, editable: true },
    { field: "userType", headerName: "User Type", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 80, editable: true },
    {
      field: "createdAt",
      headerName: "Request Time",
      width: 150,
      editable: true,
    },
  ];

  useEffect(() => {
    if (Array.isArray(tripRequests)) {
      const mappedRequests = tripRequests.map((trip, index) => ({
        _id: String(trip._id), // Keep _id as string
        id: index + 1, // Use index for DataGrid id (number)
        createdAt: trip.createdAt,
        status: trip.requestStatus,
        email: trip.user.email,
        name: trip.user.firstName,
        tripType: trip.tripType,
        userType: trip.user.userType,
      }));
      setUser1(mappedRequests);
    }
  }, [tripRequests]);

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
        Trip Requests
      </Typography>
      <DataTable
        rows={user1}
        columns={columns}
        loading={!user1.length}
        sx={tableStylesx}
      />
    </Box>
  );
};

export default TriRequestTable01;
