import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

type Props = {};

function OverViewList({}: Props) {
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
          primary={`Start Date`}
        />
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": {
              fontSize: "1.2rem",
              fontWeight: "600",
            },
          }}
          primary={`End Date`}
        />
      </ListItemButton>
      <Divider sx={{ width: "100" }} />
      <ListItemButton sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
        <ListItemText primary={`France`} />
        <ListItemText primary={`May 2, 2023`} />
        <ListItemText primary={`Jun 3, 2023`} />
      </ListItemButton>
    </div>
  );
}

export default OverViewList;
