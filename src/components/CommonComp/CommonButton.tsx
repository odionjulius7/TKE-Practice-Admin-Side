import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

interface CommonButtonProps extends ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  sx?: any;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommonButton = ({
  children,
  size,
  disabled,
  color,
  variant,
  sx,
  onClick,
}: CommonButtonProps) => {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      sx={sx}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
