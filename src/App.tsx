import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Generator from "./components/generator";
/* import FontProperties from "./types/fonts"; */
import WebFont from "webfontloader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import Swal from 'sweetalert2'
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const [image, setImage] = useState("");
  /* const [position, setPosition] = useState({ x: 0, y: 0 }); */
  const [size, setSize] = useState({ width: 20, height: 20 });
/*   const [fontSettings, setFontSettings] = useState<FontProperties>({
    color: "fff",
    weight: "regular",
    style: "regular",
    family: "Roboto",
    variant: "regular",
    size: 10,
  }); */
  const [downloadedImages, setDownloadedImages] = useState<{ name: string; url: string }[]>([]);
  
  const ref = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  }, []);

  const { isAuthenticated } = useAuth0();

  const handleDownload = async () => {

    if (!isAuthenticated) {
      Swal.fire({
        title: '<strong>Login</strong>',
        icon: 'info',
        html:
          'Debes loguearte para poder descargar las miniaturas de forma automática.',
        
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Entendido',
        confirmButtonAriaLabel: 'Thumbs up, Entendido!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      });
      return;
    }
  
    if (!ref.current) {
      console.error('El objeto ref es nulo');
      return;
    }
    
    const images = Array.from(ref.current.childNodes);

    let index = 1;
  
    try {
      for (const image of images) {
        const dataUrl = await toPng(image as HTMLElement);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
  
          const newCanvas = document.createElement("canvas");
          if (index === 1) {
            newCanvas.width = 400;
            newCanvas.height = 300;
          } else if (index === 2) {
            newCanvas.width = 160;
            newCanvas.height = 120;
          } else if (index === 3) {
            newCanvas.width = 120;
            newCanvas.height = 120;
          }
          const newCtx = newCanvas.getContext("2d");
          newCtx?.drawImage(
            canvas,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            newCanvas.width,
            newCanvas.height
          );
  
          const newName = `file-${index}.png`;
          const newDataUrl = newCanvas.toDataURL("image/png");
          download(newDataUrl, newName);
          index += 1;
        };
        img.src = dataUrl;
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'No hay imagen seleccionada para generarle miniaturas'
      })
    }
  };
  
  const handleGetLinks = async () => {

    if (!isAuthenticated) {
      Swal.fire({
        title: '<strong>Login</strong>',
        icon: 'info',
        html:
          'Debes loguearte para poder obtener los enlaces de vista previa.',
        
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Entendido!',
        confirmButtonAriaLabel: 'Thumbs up, Entendido!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      });
      return;
    }
    const images = Array.from(ref.current?.childNodes ?? []);
  
    try {
      let links = await Promise.all(
        images.map(async (image, index) => {
          const dataUrl = await toPng(image as HTMLElement);
          let name = "";
          if (index === 0) name = "400x300";
          else if (index === 1) name = "160x120";
          else if (index === 2) name = "120x120";
          const url = URL.createObjectURL(
            await fetch(dataUrl).then((res) => res.blob())
          );
          return { name, url };
        })
      );
  
      setDownloadedImages(links);
  
      if (links.length === images.length) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Vistas previas generadas'
        })
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'No hay imagen seleccionada para que se generen las vistas previas'
      })
    }
  };

  const handleClearImage = () => {
    setImage("");
    setDownloadedImages([]);
  
    if (image) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Imagen borrada'
      })
    }
    else if (!image) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'No hay imagen para limpiar'
      })
    }
  };
  

  /* useEffect(() => {
    WebFont.load({
      google: {
        families: [`${fontSettings.family}:${fontSettings.variant}`],
      },
    });
  }, [fontSettings.family, fontSettings.variant]); */

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => {
      if (!prev) {
        Swal.fire({
          title: '<strong>Vista previa </strong>',
          icon: 'info',
          html:
            'Cuando haya una imagen o foto en el centro, haz click en <b>"Generar vistas previas"</b>, para que aparezcan las vistas previas.',
          
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Entendido!',
          confirmButtonAriaLabel: 'Thumbs up, Entendido!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        });
      }
      return !prev;
    });
  };
  /* ------------------------------------------------------------------------------------------------------------------- */
  /* ------------------------------------------------------------------------------------------------------------------- */
  return (
    <Container sx={{  maxWidth: 'none !important',border: 2, position: 'sticky', top: 0, left: 0, right: 0, bottom: 0, marginLeft:-8, marginRight:-10, width: '100vw', height: '120vh', display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
    <Navbar checked={checked} onChange={handleChange}  />
      <Grid container spacing={2} justifyContent="center" marginTop={10}  >
      
      <Collapse in={checked}>
        <Grid item  xs={1} sm={2} md={6} lg={1} 
          className="grid0"
          minWidth={110}
          minHeight={200}
          borderRadius="5px" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.55)" 
          sx={{ backgroundColor: "#eceff1", border: 1, display: "flex", flexDirection: "column", flexWrap: "wrap", maxWidth: "10%", maxHeight: "220px", textAlign: "center", marginTop:{xs:"-136%", sm:"80%"} }}
          >
            
          <Typography variant="h6"  mb="15%"  fontSize={18} style={{ textDecoration: 'underline', marginLeft:"-1%"}}>
              Vista previa
          </Typography>
              {downloadedImages.map(({ name, url }) => (
              <Box key={name} >
                <Typography variant="h5" component="h1" mr="2" fontSize={16}>{name}</Typography>
                <Link variant="h6" href={url} target="_blank" rel="noopener" fontSize={15} children="Ver" />
              </Box>
            ))}
            
        </Grid>
        
        </Collapse>

      <Grid item  className="grid1" xs={12} sm={5} md={6} lg={6} order={{xs: -1, sm:0, md:0, lg:0, xl:1 }}
      sx={{ marginLeft:"auto"}}>
        <Box textAlign="center" >
          <Canvas
            /* fontSettings={fontSettings} */
            image={image}
            /* position={position} */
            size={size}
            onDrop={onDrop}
            /* onDrag={(event, delta) => {
              setPosition({ x: delta.x, y: delta.y });
            }} */
            onResize={(event, direction, { style }, delta, position) => {
              setSize({
                width: parseInt(style.width),
                height: parseInt(style.height),

              });
              /* setPosition(position); */
            }}
            
          />
        </Box>
      </Grid>
      
          <Grid item className="grid2" xs={12} sm={4} md={3} lg={2}  order={{xs: -1, sm:0, md:0, lg:0, xl:0 }}
           sx={{  display: 'flex', justifyContent: {xs: 'center', sm: 'flex-end'}, marginLeft: { xs: 0, sm: 'auto' }, marginBottom:"50%"}}>
            <Box textAlign="center" border={1} borderRadius="5px" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.55)" sx={{backgroundColor: "#eceff1"}}>
              <Sidebar onDownload={handleDownload} onClear={handleClearImage} onLinks={handleGetLinks}>
              </Sidebar>
            </Box>
          </Grid>
          
      </Grid>
      <Generator ref={ref} image={image} /* position={position} */ size={size} />
      
      
    </Container>
  );
};

export default App;

