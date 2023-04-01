import React from "react";
import ImageDropzone from "./image-dropzone";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import Position from "../types/position";
import Size from "../types/size";
import FontProperties from "../types/fonts";
import {Box} from "@material-ui/core";


type CanvasProps = {
  image: string;
  position: Position;
  size: Size;
  fontSettings: FontProperties;
  onDrop: (files: File[]) => void;
  onDrag: RndDragCallback;
  onResize: RndResizeCallback;
};

const Canvas = ({
  image,
  fontSettings,
  position,
  size,
  onDrop,
  onDrag,
  onResize,
}: CanvasProps) => {
  return (
    <Box  height="100%" width="100%">
      <Box  display= "flex"
    justify-content= "center"
    align-items= "center" >
        {image ? (
          <>
             <img
            style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "15%" }}
            src={image}
            alt="thumbnail layout"
          />
            <Rnd
              position={position}
              size={size}
              onDragStop={onDrag}
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

              {/* <Flex
                align="center"
                justify="center"
                w="100%"
                h="100%"
                border="2pt dashed"
                borderColor="white"
              >
                <Text
                  color={`#${fontSettings.color}`}
                  fontSize={fontSettings.size}
                  fontFamily={fontSettings.family}
                  fontStyle={fontSettings.style}
                  fontWeight={fontSettings.weight}
                >
                  01
                </Text>
              </Flex> */}