import NotFoundImage from '../client/assets/404.png'
import Image from "next/image";

const NotFound = () => {
  return(
    <div style={{ position: "relative", height:"100vh", paddingBottom: "20%" }} >
      <Image
        alt="404 Not found"
        src={NotFoundImage.src}
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
} 

export default NotFound;