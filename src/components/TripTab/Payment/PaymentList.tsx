import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import BtnPayment from "../../TripButtons/BtnPament";

type Props = { payment: any; id: any };

function PaymentList({ payment, id }: Props) {
  console.log(payment);

  //
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
      {payment?.map((item: any, index: any) => (
        <ListItemButton
          key={index}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            marginBottom: "1.5rem",
          }}
        >
          <ListItemText primary={item?.title} />
          <ListItemText
            sx={{
              "& .css-10hburv-MuiTypography-root": {
                marginRight: "1rem",
              },
            }}
            // primary={`view link`}
          >
            <a
              href={item?.invoice_link}
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
          <BtnPayment item={item} id={id} />
        </ListItemButton>
      ))}
      <Divider sx={{ width: "100" }} />
    </div>
  );
}

export default PaymentList;
