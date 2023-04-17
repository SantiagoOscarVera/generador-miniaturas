import React from "react";
import { Box } from "@material-ui/core";

type GeneratorProps = {
  image: string;
  size: { width: number; height: number };
};

const Generator = React.forwardRef<HTMLDivElement, GeneratorProps>(
  ({ image }, ref) => {
    return (
      <Box position="fixed" top="100vh">
        <div ref={ref}>
          {[{ width: 400, height: 300 }, { width: 160, height: 120 }, { width: 120, height: 120 }].map((size, index) => ( // tamaños de las vistas previas
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


