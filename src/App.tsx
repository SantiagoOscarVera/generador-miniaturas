import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Generator from "./components/generator";
import FontSection from "./components/font-section";
import FontProperties from "./types/fonts";
import WebFont from "webfontloader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";


const App = () => {
  const [image, setImage] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 20, height: 20 });
  const [fontSettings, setFontSettings] = useState<FontProperties>({
    color: "fff",
    weight: "regular",
    style: "regular",
    family: "Roboto",
    variant: "regular",
    size: 10,
  });
  const [downloadedImages, setDownloadedImages] = useState<{ name: string; url: string }[]>([]);
  
  const ref = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  }, []);

  const handleDownload = async () => {
    if (!ref.current) return;
  
    const images = Array.from(ref.current.childNodes);
    let index = 1;
  
    for (const image of images) {
      const dataUrl = await toPng(image as HTMLElement);
      const name = `file-${index}.png`;
      download(dataUrl, name);
      index += 1;
    }
  };
  const handleGetLinks = async () => {
    const images = Array.from(ref.current?.childNodes ?? []);
    const links = await Promise.all(
      images.map(async (image, index) => {
        const dataUrl = await toPng(image as HTMLElement);
        const name = `file-${index + 1}.png`;
        const url = URL.createObjectURL(
          await fetch(dataUrl).then((res) => res.blob())
        );
        return { name, url };
      })
    );
    setDownloadedImages(links);
  };
  const handleClearImage = () => {
    setImage("");
    setDownloadedImages([]);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: [`${fontSettings.family}:${fontSettings.variant}`],
      },
    });
  }, [fontSettings.family, fontSettings.variant]);

  /* ------------------------------------------------------------------------------------------------------------------- */
  /* ------------------------------------------------------------------------------------------------------------------- */


  return (
    <Container sx={{  maxWidth: 'none !important',border: 2, position: 'sticky', top: 0, left: 0, right: 0, bottom: 0, marginLeft:-8, marginRight:-10, width: '100vw', height: '120vh', display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
    <Navbar />
      <Grid container spacing={2} justifyContent="center" marginTop={10}>
      <Grid item sx={{ marginLeft:"auto"}}>
        <Box textAlign="center" >
          <Canvas
            fontSettings={fontSettings}
            image={image}
            position={position}
            size={size}
            onDrop={onDrop}
            onDrag={(event, delta) => {
              setPosition({ x: delta.x, y: delta.y });
            }}
            onResize={(event, direction, { style }, delta, position) => {
              setSize({
                width: parseInt(style.width),
                height: parseInt(style.height),

              });
              setPosition(position);
            }}
            
          />
          </Box>
          </Grid>
          <Grid className="grid2" item sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft:"auto", marginTop:"-2.5%"}}>
            <Box textAlign="center" border={1} borderRadius="5px" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.55)">
              <Sidebar onDownload={handleDownload} onClear={handleClearImage} onLinks={handleGetLinks}>
              </Sidebar>
            </Box>
          </Grid>
      </Grid>
      <Generator ref={ref} image={image} position={position} size={size} />
      {/* <Box p="5" mt="5" marginLeft="20%" style={{ backgroundColor: "#065fd4"}}   >
        <Typography variant="h4" component="h1" fontWeight="semibold" mb="4" ml="15%">
          Url de imagenes previas:
        </Typography>
        {downloadedImages.map(({ name, url }) => (
          <Box key={name} align="center" >
            <Typography variant="h4" component="h1" mr="2">{name}</Typography>
            <Link as="a" href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Link>
          </Box>
        ))}
      </Box> */}
      
    </Container>
  );
};

export default App;


/* return (
  <ChakraProvider>
    <Flex direction="column" h="100vh">
      <Navbar />
      <Flex h="100%">
        <Canvas
          fontSettings={fontSettings}
          image={image}
          position={position}
          size={size}
          onDrop={onDrop}
          onDrag={(event, delta) => {
            setPosition({ x: delta.x, y: delta.y });
          }}
          onResize={(event, direction, { style }, delta, position) => {
            setSize({
              width: parseInt(style.width),
              height: parseInt(style.height),

            });
            setPosition(position);
          }}
          
        />
        <Sidebar onDownload={handleDownload} onClear={handleClearImage} onLinks={handleGetLinks}>
          <BoxSection
            size={size}
            position={position}
            onSizeChange={setSize}
            onPositionChange={setPosition}
          />
          <FontSection value={fontSettings} onChange={setFontSettings} />
        </Sidebar>
      </Flex>
    </Flex>
    <Generator ref={ref} image={image} position={position} size={size} />
    <Box p="5" mt="5" marginLeft="20%" bg="white"   >
      <Text fontWeight="semibold" mb="4" ml="15%">
        Url de imagenes previas:
      </Text>
      {downloadedImages.map(({ name, url }) => (
        <Flex key={name} align="center" >
          <Text mr="2">{name}</Text>
          <Text as="a" href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Text>
        </Flex>
      ))}
    </Box>
    
  </ChakraProvider>
);
}; */

