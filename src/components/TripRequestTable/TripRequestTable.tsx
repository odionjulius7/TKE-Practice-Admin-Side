import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";

type Props = {
  //   rows: [];
  //   columns: GridColDef[];
};

const tableStylesx = { height: 450, width: "100%" };

const TripRequestTable = (props: Props) => {
  const [users, setUsers] = useState<[]>([]);
  const { tripRequests } = useAppSelector((state) => state.tripRequests);
  //
  console.log(tripRequests);

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
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "username", // the key to display in users array {}
      headerName: "username", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "phone", // the key to display in users array {}
      headerName: "phone Num.", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "website", // the key to display in users array {}
      headerName: "Trip type", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "detailsLink",
      headerName: "Details",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <CustomLinkCell value={params.row.id as number} />
      ),
    },
  ];

  //

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <DataTable
      rows={users}
      columns={columns}
      loading={!users.length} // if no lenght loading runs
      sx={tableStylesx}
    />
  );
};

export default TripRequestTable;
