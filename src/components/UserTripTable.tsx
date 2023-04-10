import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DataTable from "./DataTable/DataTable";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../Features/storeHook";
import { fetchAUsersTrip } from "../Features/Trip/tripSlice";
import { Trips } from "../models/TripRequest.interface";
import moment from "moment";

type Props = {
  _id: any;
  // text: string;
};
//   rows: [];
//   columns: GridColDef[];

const tableStylesx = { height: 450, width: "80%" };

const UserTripTable = ({ _id }: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  const { usertrips, createdTripId } = useAppSelector((state) => state.trips);
  const [tableTrip, setTableTrip] = useState<Trips[]>([]);
  const [users, setUsers] = useState<[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_id && token) {
      // Make sure the token is available before making the request
      // convert the id to string if it wasn't a string before
      const ids: { token: string; _id: string } = { token, _id };
      dispatch(fetchAUsersTrip(ids));
    }
  }, [_id, token, createdTripId, dispatch]);

  //

  function CustomLinkCell({ value, title }: { value: string; title: string }) {
    const navigate: NavigateFunction = useNavigate();

    function handleClick() {
      const to = `/trip/${value}`;
      navigate(to);
      // history.push(`/details/${value}`); // Replace with the desired URL path
    }

    return (
      <Button onClick={handleClick}>
        {!title ? "fill trip details" : "view trip"}
      </Button>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "id", // the key to display from users array {}
      headerName: "ID", // the name of that header
      width: 90,
    },
    {
      field: "title", // the key to display in users array {}
      headerName: "Title", // the name of that header
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "startDate", // the key to display in users array {}
      headerName: "start date", // the name of that header
      width: 200,
      editable: true,
      // renderCell: (params) => <CustomLinkCell value={params.row.id} />,
    },
    {
      field: "endDate", // the key to display in users array {}
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
        <CustomLinkCell
          value={params.row._id as string}
          title={params.row.title}
        />
      ),
    },
  ];

  //
  // moment(overview?.startDate).format("ll")
  useEffect(() => {
    if (Array.isArray(usertrips)) {
      // const newUser = usertrips.filter((trip) => user.role === "user");
      const tripProps: any = usertrips.map((trip, index) => {
        return {
          _id: trip?._id,
          id: index + 1,
          title: trip?.overview?.title,
          startDate: moment(trip?.overview?.startDate).format("ll"),
          endDate: moment(trip?.overview?.endDate).format("ll"),
        };
      });
      setTableTrip([...tripProps]);
    }
  }, [usertrips]);

  //

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json));
  // }, []);

  return (
    <DataTable
      rows={tableTrip}
      columns={columns}
      loading={!tableTrip.length}
      sx={tableStylesx}
    />
  );
};

export default UserTripTable;
