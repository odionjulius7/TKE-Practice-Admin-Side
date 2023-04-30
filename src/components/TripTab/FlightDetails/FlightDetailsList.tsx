import { Divider, ListItemButton, ListItemText, Stack } from "@mui/material";
import React from "react";
import moment from "moment";
import BtnFlight from "../../TripButtons/BtnFlight";

type Props = { flight: any; id: any };
type Items = {
  location:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  date: moment.MomentInput;
};

function FlightDetailsList({ flight, id }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  return (
    <div>
      <ListItemButton>
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
            },
          }}
          primary={`Location`}
        />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
            },
          }}
          primary={`Date`}
        />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
              marginLeft: "2rem",
              textAlign: "center",
            },
          }}
          primary={`More`}
        />
      </ListItemButton>
      <Divider sx={{ width: "100" }} />
      {flight?.map((item: Items, index: React.Key | null | undefined) => (
        <Stack key={index} sx={{ margin: "0 0 1.5rem 0" }}>
          <ListItemButton sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ListItemText primary={item?.location} />
            <ListItemText
              sx={{
                "& .css-10hburv-MuiTypography-root": {
                  marginRight: "2rem",
                },
              }}
              primary={moment(item?.date).format("ll")}
            />
            <BtnFlight item={item} id={id} />
            {/* Edit */}
          </ListItemButton>
          <Divider sx={{ width: "100" }} />
        </Stack>
      ))}
    </div>
  );
}

export default FlightDetailsList;

// const dispatch = useAppDispatch();

// const handleClicked = (id: any) => {
//   dispatch(setSelectedItem(id));
// };

// const handleClickMenuItem = (event: React.MouseEvent<HTMLLIElement>) => {
//   handleClose();
//   const clickedItemId = event.currentTarget.dataset.itemId;
//   handleClicked(clickedItemId);
// };
