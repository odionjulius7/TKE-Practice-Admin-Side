import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  open: boolean;
};

const BasicMenu = ({ anchorEl, handleClose, open }: Props) => {
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //   const open = Boolean(anchorEl);
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  return (
    <div>
      {" "}
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;

//   const [open, setOpen] = useState<boolean>(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//     setOpen(true);
//   };

// const handleClose = () => {
//   setOpen(false);
// };
