import { Divider, ListItemButton, ListItemText } from "@mui/material";
import moment from "moment";

type Props = {
  overview: any;
};

function OverViewList({ overview }: Props) {
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
        <ListItemText primary={overview?.title} />
        <ListItemText primary={moment(overview?.startDate).format("ll")} />
        <ListItemText primary={moment(overview?.endDate).format("ll")} />
      </ListItemButton>
    </div>
  );
}

export default OverViewList;
