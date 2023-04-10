import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";

type Props = {};

const tableStylesx = { height: 450, width: "100%" };
interface Props1 {
  _id: string | number;
  id?: number;
  createdAt?: string;
  status?: string;
  email?: string;
  name?: string;
  tripType?: string;
  userType?: string;
}
const TriRequestTable01 = (props: Props) => {
  // const [users, setUsers] = useState<[]>([]);
  const [user1, setUser1] = useState<Props1[]>([]);
  const tripRequests = useAppSelector(
    (state) => state.tripRequests.tripRequests
  );
  //

  function CustomLinkCell({ value }: { value: number }) {
    const navigate: NavigateFunction = useNavigate();

    function handleClick() {
      const to = `/request/${value}`;
      navigate(to);
      // history.push(`/details/${value}`); // Replace with the desired URL path
    }

    return <Button onClick={handleClick}>View Trip</Button>;
  }

  const columns: GridColDef[] = [
    {
      field: "id", // the key to display from users array {}
      headerName: "ID", // the name of that header
      width: 90,
    },
    {
      field: "name", // the key to display in users array {}
      headerName: "Trip Name", // the name of that header
      width: 120,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "email", // the key to display in users array {}
      headerName: "Email", // the name of that header
      width: 150,
      editable: true,
    },
    {
      field: "tripType", // the key to display in users array {}
      headerName: "Trip Type", // the name of that header
      width: 150,
      editable: true,
    },
    {
      field: "userType", // the key to display in users array {}
      headerName: "User Type", // the name of that header
      width: 150,
      editable: true,
    },
    {
      field: "status", // the key to display in users array {}
      headerName: "Status", // the name of that header
      width: 80,
      editable: true,
    },
    {
      field: "createdAt", // the key to display in users array {}
      headerName: "Requeest Time", // the name of that header
      width: 150,
      editable: true,
    },
    {
      field: "detailsLink",
      headerName: "Details",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <CustomLinkCell value={params.row._id as number} />
      ),
    },
  ];

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json));
  // }, []);

  //
  useEffect(() => {
    if (Array.isArray(tripRequests)) {
      //   const newTripRequests = tripRequests.filter(
      //     (trip) => trip.requestStatus === "new"
      //   );
      const props = tripRequests.map((trip, index) => {
        return {
          _id: trip._id,
          id: index + 1,
          createdAt: trip.createdAt,
          status: trip.requestStatus,
          email: trip.user.email,
          name: trip.user.firstName,
          tripType: trip.tripType,
          userType: trip.user.userType,
        };
      });
      setUser1([...props]);
    }
  }, [tripRequests]);

  return (
    <DataTable
      rows={user1}
      columns={columns}
      loading={!user1.length} // if no lenght loading runs
      sx={tableStylesx}
    />
  );
};

export default TriRequestTable01;
