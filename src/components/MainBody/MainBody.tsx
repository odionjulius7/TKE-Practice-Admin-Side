import { Grid } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainBody = ({ children }: Props) => {
  return (
    <Grid item xs={12} md={10} lg={10} sx={{ padding: "30px" }}>
      {children}{" "}
    </Grid>
  );
};

export default MainBody;

{
  // const placeholder = "Search by user email address or phone number";
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.value);
  // };
  /* <CardComponent
        header={
          <div>
            <SearchBar placeholder={placeholder} onchange={handleChange} />
            <CommonButton children="button" />
          </div>
        }
        content={undefined}
      />
      <CommonButton children={undefined} /> */
}
