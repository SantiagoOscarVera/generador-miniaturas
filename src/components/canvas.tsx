import React from "react";
import ImageDropzone from "./image-dropzone";
import { Rnd, RndResizeCallback } from "react-rnd";
import Size from "../types/size";
import {Box} from "@material-ui/core";

type CanvasProps = {
  image: string;
  size: Size;
  onDrop: (files: File[]) => void;
  onResize: RndResizeCallback;
};

const Canvas = ({
  image,
  size,
  onDrop,
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
              size={size}
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
