import React, { useState } from "react";
import { NavBar, TopNavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { CommonButton, NotificationBadge } from "../../components/CommonComp";

import testImg from "../../img/test.jpeg";

import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Divider,
  Input,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { uploadGeneralBanner } from "../../Features/Banner/generalBanner";

type Props = {};

const UploadBanner = (props: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const { tripCount } = useAppSelector((state) => state.trips);
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const { isLoading, datas } = useAppSelector((state) => state.generalBanner);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!image) {
      return toast.info("fill image input");
    }
    const formData = new FormData();
    if (image) {
      formData.append("generalBanner", image);
    }
    // "downlevelIteration": true,// add this to the typescript.json compilerOptions when looping through formData
    console.log([...formData]);
    try {
      await dispatch(uploadGeneralBanner({ formData }));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <Grid container>
      <Grid item xs={2}>
        <NavBar />
      </Grid>

      <MainBody>
        <TopNavBar sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={4}>
            <h2 style={{ textAlign: "initial", marginLeft: "1rem" }}>
              Add General Banner
            </h2>
          </Grid>
          <Grid item xs={6}>
            &nbsp;
          </Grid>

          <Grid item xs={3}>
            <NotificationBadge
              badgeContent={requestCount}
              text="Total Number of Trip Request"
            />
            <NotificationBadge
              badgeContent={tripCount}
              text="Total Number of Trip"
            />
          </Grid>
        </TopNavBar>

        <Divider sx={{ margin: "2rem 0" }} />
        <Box
          sx={{
            width: "100%",
            height: 500,
            textAlign: "center",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardMedia sx={{ height: "70%" }} title="">
            <img
              style={{ height: "100%", width: "70%" }}
              src={
                image
                  ? URL.createObjectURL(image)
                  : datas?.imgURL
                  ? datas?.imgURL
                  : testImg
              }
              // src={image ? URL.createObjectURL(image) : testImg}
              // src={
              //   image
              //     ? URL.createObjectURL(image)
              //     : user?.banner?.imgURL
              //     ? user?.banner?.imgURL
              //     : testImg
              // }
              alt=""
            />
          </CardMedia>

          <CardActions sx={{ marginTop: "3rem" }}>
            <Button size="small">
              <CloudUploadIcon sx={{ margin: "0.4rem" }} />{" "}
              <label htmlFor="img" style={{ cursor: "pointer" }}>
                {isLoading ? "uploading..." : "Upload Banner"}
              </label>
            </Button>

            <Input
              sx={{ display: "none" }}
              id="img"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            <CommonButton
              children="Submit"
              size="small"
              variant="text"
              color="info"
              onClick={handleSubmit}
            />
          </CardActions>
        </Box>
      </MainBody>
    </Grid>
  );
};

export default UploadBanner;
