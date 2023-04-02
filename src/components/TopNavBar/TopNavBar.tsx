import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

type Props = {
  children: ReactNode;
  sx: {};
};

const TopNavBar = ({ children, sx }: Props): JSX.Element => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Item sx={sx}>{children}</Item>
      </Stack>
    </Box>
  );
};

export default TopNavBar;
