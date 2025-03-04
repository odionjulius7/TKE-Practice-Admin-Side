import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button, Box, Typography } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";
import { User } from "../../models/DisplayUser.interface";

const tableStylesx = { height: 450, width: "100%" };

/**
 * Displays a table of users with clickable names linking to their details.
 * Filters users by role 'user' and fetches data from Redux store.
 */
const UserTable: React.FC = () => {
  const users1 = useAppSelector((state) => state.user.users);
  const [tableUsers, setTableUsers] = useState<User[]>([]);

  function CustomLinkCell({ value, name }: { value: string; name: string }) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/user/${value}`);
    }

    return (
      <Button
        onClick={handleClick}
        sx={{
          textTransform: "none",
          color: "#ec407a",
          "&:hover": { color: "#d81b60" },
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {name}
      </Button>
    );
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <CustomLinkCell
          value={params.row.id}
          name={params.row.firstName || "N/A"}
        />
      ),
    },
    { field: "lastName", headerName: "Last Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    // {
    //   field: "phoneNumber",
    //   headerName: "Phone Num.",
    //   width: 200,
    //   editable: true,
    // },
  ];

  useEffect(() => {
    if (Array.isArray(users1)) {
      const filteredUsers = users1.filter((user) => user.role === "user");
      const userProps: User[] = filteredUsers.map((user) => ({
        _id: String(user._id),
        id: String(user._id),
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        postCode: user.postCode || "",
        role: user.role || "user",
        // phoneNumber: user.phoneNumber || "",
        // Add other User fields if required by DisplayUser.interface
      }));
      setTableUsers(userProps);
    }
  }, [users1]);

  return (
    <DataTable
      rows={tableUsers}
      columns={columns}
      loading={!tableUsers.length}
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
            bgcolor: "#fff",
            border: "1px solid #5e35b1",
            color: "#000000",
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
  );
};

export default UserTable;
