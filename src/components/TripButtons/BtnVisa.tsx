import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FlightModal from "../Modals/FlightDetailsModal";
import AgreementModal from "../Modals/AgreementModal";
import VisaModal from "../Modals/VisaModal";

type Props = {
  item: any;
  id: any;
};
export default function BtnVisa({ item, id }: Props) {
  const [selectedItem01, setSelectedItem01] = React.useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBtn = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={openBtn ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openBtn ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "& .css-19vlbk0-MuiButtonBase-root-MuiButton-root": {
            padding: "0px",
            margin: "0",
          },
          padding: "0",
          margin: "0",
          marginRight: "2rem",
        }}
      >
        More
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openBtn}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // sx={{ marginTop: "2rem" }}
      >
        <MenuItem
        //  onClick={handleClose}
        >
          <VisaModal id={id} item={item} />
        </MenuItem>
        <MenuItem
        // onClick={handleClose}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
