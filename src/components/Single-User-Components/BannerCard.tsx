import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import testImg from "../../img/test.jpeg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CommonButton } from "../CommonComp";

import { User } from "../../models/DisplayUser.interface";
import { Input } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Features/storeHook";
import { createUserBanner } from "../../Features/users/usersSlice";

type Props = {
  user: User | null;
};

const BannerCard = ({ user }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!image) {
      return toast.info("fill image input");
    }
    const formData = new FormData();
    if (image) {
      formData.append("banner", image);
    }
    // "downlevelIteration": true,// add this to the typescript.json compilerOptions when looping through formData
    console.log([...formData]);
    try {
      await dispatch(createUserBanner({ formData, id: user?._id }));
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
    // <Card sx={{ height: "100%" }}>
    <>
      <CardMedia sx={{ height: "50%" }} title="">
        <img
          style={{ height: "200px", width: "100%" }}
          src={
            image
              ? URL.createObjectURL(image)
              : user?.banner?.imgURL
              ? user?.banner?.imgURL
              : testImg
          }
          alt=""
        />
      </CardMedia>

      <CardActions sx={{ marginTop: "3rem" }}>
        <Button size="small">
          <CloudUploadIcon sx={{ margin: "0.4rem" }} />{" "}
          <label htmlFor="img" style={{ cursor: "pointer" }}>
            Upload Banner
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
    </>
    // </Card>
  );
};

export default BannerCard;
