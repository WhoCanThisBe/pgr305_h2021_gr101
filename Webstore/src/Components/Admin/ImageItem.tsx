import {FC} from "react";
import {Button, Card} from "react-bootstrap";
import {IImage} from "../../Interfaces/IImage";

type Props = {
    image: IImage;
}

const ImageItem: FC<Props> = ({image}) => {
  return(
      <Card
          className={"clickable"}
      >
          <Card.Img
              src={`https://localhost:5001/images/${image.name}`}
          />
        <Card.Body>
            <Button variant={"danger"}>
                Delete
            </Button>
        </Card.Body>
      </Card>
  )
};

export default ImageItem;