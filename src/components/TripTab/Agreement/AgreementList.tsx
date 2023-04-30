import { Divider, ListItemButton, ListItemText, Stack } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BtnFlight from "../../TripButtons/BtnFlight";
import BtnAgreement from "../../TripButtons/BtnAgreement";

type Props = {
  agreement: any;
  id: any;
};

// can just be any
type Items = {
  title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  document_link: any;
  status:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

function AgreementList({ agreement, id }: Props) {
  // console.log(agreement);

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
          primary={`Agreement-Link`}
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
      {agreement?.map((item: Items, index: React.Key | null | undefined) => {
        return (
          <Stack key={index} sx={{ marginBottom: "1.5rem" }}>
            <ListItemButton sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
              <ListItemText primary={item?.title} />
              <ListItemText
                sx={{
                  "& .css-10hburv-MuiTypography-root": {
                    marginRight: "1rem",
                  },
                }}
              >
                <a
                  href={`${item?.document_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </ListItemText>
              <ListItemText
                sx={{
                  "& .css-10hburv-MuiTypography-root": {
                    marginRight: "1rem",
                  },
                }}
                primary={item?.status}
              />
              <BtnAgreement item={item} id={id} />
            </ListItemButton>
            <Divider sx={{ width: "100" }} />
          </Stack>
        );
      })}
    </div>
  );
}

export default AgreementList;
