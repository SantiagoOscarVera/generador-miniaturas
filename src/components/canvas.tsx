import React from "react";
import ImageDropzone from "./image-dropzone";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
/* import Position from "../types/position"; */
import Size from "../types/size";
/* import FontProperties from "../types/fonts"; */
import {Box} from "@material-ui/core";


type CanvasProps = {
  image: string;
  /* position: Position; */
  size: Size;
  /* fontSettings: FontProperties; */
  onDrop: (files: File[]) => void;
  /* onDrag: RndDragCallback; */
  onResize: RndResizeCallback;
};

const Canvas = ({
  image,
  /* position, */
  size,
  onDrop,
  /* onDrag, */
  onResize,
}: CanvasProps) => {
  return (
    <Box  height="100%" width="100%">
      <Box  display= "flex"
            justify-content= "center"
            align-items= "center" 
            >
        {image ? (
          <>
             <img
            style={{  maxWidth: "80%", maxHeight: "70vh", height:"100%", width:"100%", marginLeft:"10%" }}
            src={image}
            alt="thumbnail layout"
            
          />
            <Rnd
              /* position={position} */
              size={size}
              /* onDragStop={onDrag} */
              onResizeStop={onResize}
              bounds="parent"
            >
            </Rnd>
          </>
        ) : (
          <ImageDropzone onDrop={onDrop} />
        )}
      </Box>
    </Box>
  );
};

export default Canvas;
