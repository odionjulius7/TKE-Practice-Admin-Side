import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BtnConfirmation from "../../TripButtons/BtnConfirmation";

type Props = { travelConfirmation: any; id: any };

function TravelConList({ travelConfirmation, id }: Props) {
  // console.log(travelConfirmation);

  // close dropDown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          primary={`Title`}
        />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
              marginLeft: "1.5rem",
            },
          }}
          primary={`travel-Link`}
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
      {travelConfirmation?.map((item: any, index: any) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <ListItemButton sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ListItemText primary={item?.title} />
            <ListItemText
              sx={{
                "& .css-10hburv-MuiTypography-root": {
                  marginRight: "2rem",
                },
              }}
              // primary={`view link`}
            >
              <a
                href={item?.document_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </ListItemText>

            <BtnConfirmation item={item} id={id} />
          </ListItemButton>
          <Divider sx={{ width: "100" }} />
        </div>
      ))}
    </div>
  );
}

export default TravelConList;
