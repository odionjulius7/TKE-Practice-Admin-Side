import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

type Props = {
  header: any;
  content: React.ReactNode;
};

const CardComponent = ({ header, content }: Props) => {
  return (
    <Card>
      {header}
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CardComponent;
