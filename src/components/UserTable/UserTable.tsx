import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button } from "@mui/material";

type Props = {
  //   rows: [];
  //   columns: GridColDef[];
};

const tableStylesx = { height: 450, width: "100%" };

const UserTable = (props: Props) => {
  const [users, setUsers] = useState<[]>([]);

  //

  function CustomLinkCell({ value }: { value: number }) {
    const navigate: NavigateFunction = useNavigate();

    function handleClick() {
      const to = `/user/${value}`;
      navigate(to);
      // history.push(`/details/${value}`); // Replace with the desired URL path
    }

    return <Button onClick={handleClick}>View User</Button>;
  }

  const columns: GridColDef[] = [
    {
      field: "id", // the key to display from users array {}
      headerName: "ID", // the name of that header
      width: 90,
    },
    {
      field: "name", // the key to display in users array {}
      headerName: "name", // the name of that header
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
      headerName: "website", // the name of that header
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
      loading={!users.length}
      sx={tableStylesx}
    />
  );
};

export default UserTable;

// const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "firstName",
//       headerName: "First name",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "lastName",
//       headerName: "Last name",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       width: 110,
//       editable: true,
//     },
//     {
//       field: "fullName",
//       headerName: "Full name",
//       description: "This column has a value getter and is not sortable.",
//       sortable: false,
//       width: 160,
//       valueGetter: (params: GridValueGetterParams) =>
//         `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//     },
//   ];

//   const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   ];
