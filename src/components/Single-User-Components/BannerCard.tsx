import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import testImg from "../../img/test.jpeg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CommonButton } from "../CommonComp";
import { type } from "os";

type Props = {}

const BannerCard = (props: Props) => {
  return (
    // <Card sx={{ height: "100%" }}>
    <>
      <CardMedia sx={{ height: "50%" }} title="">
        <img style={{ height: "200px", width: "100%" }} src={testImg} alt="" />
      </CardMedia>

      <CardActions sx={{ marginTop: "3rem" }}>
        <Button size="small">
          <CloudUploadIcon sx={{ margin: "0.4rem" }} /> Upload Banner
        </Button>
        <CommonButton  children="Submit"
          size="small"
          variant="text"
          color="info" />
      </CardActions>
    </>
    // </Card>
  );
};

export default BannerCard;
