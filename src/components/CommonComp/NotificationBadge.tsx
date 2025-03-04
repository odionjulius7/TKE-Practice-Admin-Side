import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  iconColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
  badgeContent?: number;
  anchorEl?: null | HTMLElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
};

const NotificationBadge = ({
  iconColor,
  badgeContent,
  anchorEl,
  onClick,
  text,
}: Props) => {
  const notificationContent = `${text} ${badgeContent} `;
  const noNotificationContent = `No Trip Request Yet! `;
  return (
    <Tooltip
      title={badgeContent === 0 ? noNotificationContent : notificationContent}
    >
      <IconButton color={iconColor}>
        <Badge
          sx={{
            bgcolor: "#fff5f7",
            borderRadius: "8px",
            p: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
          // sx={{
          //   cursor: "pointer",
          //   bgcolor: "#f06292",
          //   borderRadius: "8px",
          //   p: 1,
          //   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          // }}
          badgeContent={badgeContent}
          color="primary"
          onClick={onClick}
        >
          <MailIcon color="action" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationBadge;
