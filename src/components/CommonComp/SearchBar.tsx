import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";

type Props = {
  placeholder?: string;
  onchange?: any;
  sx?: {};
  // onchange:React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SearchBar = ({ placeholder, onchange, sx }: Props) => {
  return (
    <div style={sx}>
      <SearchIcon
        sx={{
          width: "5% !important",
          backgroundColor: "blue",
          alignSelf: "stretch",
          padding: "0.4rem",
          marginRight: "0.2rem",
        }}
      />
      <Input
        sx={{
          width: "90% !important",
          "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
            width: "100% !important",
          },
        }}
        placeholder={placeholder}
        onClick={onchange}
      />
    </div>
  );
};

export default SearchBar;
