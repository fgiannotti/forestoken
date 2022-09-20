import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "@mui/material/Button";

export default function ImageUploader() {
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(true);

  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <div className="ImageUploader">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
            >
              Subir imagen
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => onImageUpdate(index)}>Actualizar</Button>
                  <Button onClick={() => onImageRemove(index)}>Remover</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

// cuando toco subir imagen tiene que ocultar el boton de subir imagen
// cuando toco remove tiene que volver a mostrar el boton de subir imagen

//otra forma es fijarme si hay data en dataUrl y jugar a que si hay data no muestra el boton subir imagen, y si no hay lo muestra