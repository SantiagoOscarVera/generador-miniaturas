import React from "react";
import { Box } from "@material-ui/core";

type GeneratorProps = {
  image: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const Generator = React.forwardRef<HTMLDivElement, GeneratorProps>(
  ({ image }, ref) => {
    return (
      <Box position="fixed" top="100vh">
        <div ref={ref}>
          {[{ width:534, height: 400 }, { width: 214, height: 160 }, { width: 160, height: 160 }].map((size, index) => (
            <Box key={index} width={size.width} height={size.height} position="relative" overflow="hidden">
              <Box
                alignItems="center"
                bgcolor="transparent"
                justifyContent="center"
                position="absolute"
                width="100%"
                height="100%"
              >
              </Box>
              <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={image} alt="thumbnail layout" />
            </Box>
          ))}
        </div>
      </Box>
    );
  }
);

export default Generator;


