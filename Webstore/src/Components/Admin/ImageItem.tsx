import {FC} from "react";
import {Card} from "react-bootstrap";
import {IImage} from "../../Interfaces/IImage";

type Props = {
    image: IImage;
}

const ImageItem: FC<Props> = ({image}) => {
  return(
      <Card>
          <Card.Img
              src={`https://localhost:5001/images/${image.name}`}
          />
      </Card>
  )
};

export default ImageItem;