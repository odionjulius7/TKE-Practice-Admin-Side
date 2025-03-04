import React, { useEffect, useState } from "react";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";

interface TripRequestRow {
  _id: string | number;
  id: number;
  createdAt?: string;
  status?: string;
  email?: string;
  name?: string;
  tripType?: string;
  userType?: string;
}

const TripRequestTable: React.FC = () => {
  const [rows, setRows] = useState<TripRequestRow[]>([]);
  const tripRequests = useAppSelector(
    (state) => state.tripRequests.tripRequests
  );
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    { field: "name", headerName: "Trip Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    { field: "tripType", headerName: "Trip Type", width: 150, editable: true },
    { field: "userType", headerName: "User Type", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true },
    {
      field: "createdAt",
      headerName: "Request Time",
      width: 200,
      editable: true,
      valueFormatter: (params) =>
        params.value
          ? new Date(params.value as string).toLocaleDateString()
          : "Unknown",
    },
  ];

  useEffect(() => {
    if (Array.isArray(tripRequests)) {
      const newTripRequests = tripRequests
        .filter((trip) => trip.requestStatus === "new")
        .map((trip, index) => ({
          _id: trip._id,
          id: index + 1,
          createdAt: trip.createdAt,
          status: trip.requestStatus,
          email: trip.user.email,
          name: trip.user.firstName,
          tripType: trip.tripType,
          userType: trip.user.userType,
        }));
      setRows(newTripRequests);
    }
  }, [tripRequests]);

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/request/${params.row._id}`);
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "#424242",
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
        }}
      >
        Trip Requests
      </Typography>
      <Box
        sx={{
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
                cursor: "pointer",
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
      >
        <DataTable
          rows={rows}
          columns={columns}
          loading={!rows.length}
          sx={{ height: 400, width: "100%" }}
          onRowClick={handleRowClick}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default TripRequestTable;
