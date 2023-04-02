import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {};

function PaymentList({}: Props) {
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
            },
          }}
          primary={`invoice-Link`}
        />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
            },
          }}
          primary={`Status`}
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
      <ListItemButton sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
        <ListItemText primary={`Document01`} />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              marginRight: "1rem",
            },
          }}
          // primary={`view link`}
        >
          <a href="http://#" target="_blank" rel="noopener noreferrer">
            View
          </a>
        </ListItemText>
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              marginRight: "1rem",
            },
          }}
          primary={`Not Signed`}
        />
        <ActionButton
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleClick={handleClick}
        />
      </ListItemButton>
      <Divider sx={{ width: "100" }} />
    </div>
  );
}

type ButtonProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: any;
};

const ActionButton = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
}: ButtonProps) => {
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          margin: "0 1rem 0 0",
          padding: "10px",
        }}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Dele</MenuItem>
      </Menu>
    </div>
  );
};

export default PaymentList;
