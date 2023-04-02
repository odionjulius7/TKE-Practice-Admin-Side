import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "./DataTable/DataTable";
import { Button } from "@mui/material";

type Props = {
  //   rows: [];
  //   columns: GridColDef[];
};

const tableStylesx = { height: 450, width: "70%" };

const UserTripTable = (props: Props) => {
  const [users, setUsers] = useState<[]>([]);

  //

  function CustomLinkCell({ value }: { value: number }) {
    const navigate: NavigateFunction = useNavigate();

    function handleClick() {
      const to = `/trip/${value}`;
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
      headerName: "start date", // the name of that header
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "name", // the key to display in users array {}
      headerName: "End date", // the name of that header
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
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
      loading={!users.length}
      sx={tableStylesx}
    />
  );
};

export default UserTripTable;
