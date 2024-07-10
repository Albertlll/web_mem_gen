import useImage from 'use-image';
import { Image } from 'react-konva';




const BaseImage = (props : {inp_image : string}) => {
    const [image] = useImage(props.inp_image);
    return <Image image={image} />;
  };
  
export default BaseImage