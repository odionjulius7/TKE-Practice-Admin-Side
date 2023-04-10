import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { Button } from "@mui/material";
import { useAppSelector } from "../../Features/storeHook";
import { User } from "../../models/DisplayUser.interface";

type Props = {
  //   rows: [];
  //   columns: GridColDef[];
};

const tableStylesx = { height: 450, width: "100%" };

const UserTable = (props: Props) => {
  const users1 = useAppSelector((state) => state.user.users);
  const [users, setUsers] = useState<[]>([]);
  const [tableUsers, setTableUsers] = useState<User[]>([]);

  // console.log(users1);
  // console.log(tablUsers);

  function CustomLinkCell({ value }: { value: string }) {
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
      field: "firstName", // the key to display in users array {}
      headerName: "First Name", // the name of that header
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "lastName", // the key to display in users array {}
      headerName: "Last Name", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "email", // the key to display in users array {}
      headerName: "Email", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "phoneNumber", // the key to display in users array {}
      headerName: "Phone Num.", // the name of that header
      width: 200,
      editable: true,
    },
    {
      field: "detailsLink",
      headerName: "Details",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <CustomLinkCell value={params.row.email as string} />
      ),
    },
  ];

  //
  useEffect(() => {
    if (Array.isArray(users1)) {
      const newUser = users1.filter((user) => user.role === "user");
      const userProps: any = newUser.map((user, index) => {
        return {
          _id: user?._id,
          id: index + 1,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
        };
      });
      setTableUsers([...userProps]);
    }
  }, [users1]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <DataTable
      rows={tableUsers}
      columns={columns}
      loading={!tableUsers.length}
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
