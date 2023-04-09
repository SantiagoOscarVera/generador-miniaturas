import React, { createRef, RefObject, useState } from 'react';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Webcam from "react-webcam";
import { Button} from "@material-ui/core";

interface CamaraState {
  imagen: string | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    hidden: {
      display: 'none',
    },
  }),
);

type ImageDropzoneProps = {
  onDrop: (files: File[]) => void;
};

const ImageDropzone = ({ onDrop }: ImageDropzoneProps) => {
  const webcamRef: RefObject<Webcam> = createRef<Webcam>();
  const [state, setState] = useState<CamaraState>({ imagen: null });
  const [camaraVisible, setCamaraVisible] = useState<boolean>(false);
  const [capturaVisible, setCapturaVisible] = useState<boolean>(false);

  const tomarFoto = (): void => {
    if (webcamRef.current) {
      const captura = webcamRef.current.getScreenshot();
      console.log(captura);
      setState({ imagen: captura });
      setCapturaVisible(true);
    }
  };

  const ocultarCaptura = (): void => {
    setState({ imagen: null });
    setCapturaVisible(false);
  };

  const toggleCamara = (): void => {
    setCamaraVisible(!camaraVisible);
    if (capturaVisible) {
      ocultarCaptura();
    }
  };
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      setShowImage(false);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      setShowImage(true);
      onDrop(files);
    }
  });
  const classes = useStyles();

  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!openDialog) {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = (confirmed: boolean) => {
    if (confirmed) {
      const event = new MouseEvent("click", { bubbles: true });
      const inputElement = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (inputElement) {
        inputElement.dispatchEvent(event);
      }
    }
    setOpenDialog(false);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFoto = (): void => {
    tomarFoto();
  };

  const handleGuardarFoto = (): void => {
    if (state.imagen) {
      const imagenBlob = dataURLtoBlob(state.imagen);
      const imagenArchivo = new File([imagenBlob], "imagen.jpg");
      onDrop([imagenArchivo]);
    }
  };
  
      
      const dataURLtoBlob = (dataURL: string): Blob => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
      };
      
      return (
      <>
      <Box {...getRootProps()} onClick={handleBoxClick} sx={{ p: 3, bgcolor: 'grey.300', cursor: 'pointer' }}>
          <input {...getInputProps()} className={classes.hidden} />
          {loading ? (
          <Box className={classes.root}>
          <CircularProgress />
          </Box>
          ) : (
          <>
            <Typography variant="h6" align="center">
                Arrastre o haga clic aquí para elegir imagen o sacar una foto
            </Typography>
          {showImage && (
            <img
            src="https://via.placeholder.com/150"
            alt="Imagen seleccionada"
            style={{ display: 'block', margin: 'auto', marginTop: '1rem' }}
            />
            )
          }
          </>
          )}
          </Box>
          <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
            <DialogTitle>Cargar imagen o usar camara</DialogTitle>
            <DialogContent>
                <Button variant="contained" onClick={toggleCamara}>
                {camaraVisible ? 'Volver' : 'Usar cámara'}
                </Button>
                
                {camaraVisible && (
                <>
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 640, height: 360, facingMode: 'user' }}
                style={{ display: capturaVisible ? 'none' : 'block', margin: 'auto' }}
                />
                {capturaVisible && (
                <img
                src={state.imagen ?? ''}
                alt="Imagen capturada"
                style={{ display: 'block', margin: 'auto', maxWidth: '100%', maxHeight: '80vh' }}
                />
                )}
                </>
                )}
            </DialogContent>
            <DialogContent>
            <Button variant="contained" onClick={() => handleDialogClose(true)}>
                  Subir imagen
                </Button>
            </DialogContent>
            <DialogActions>
                {capturaVisible && (
                <Button variant="contained" color="primary" onClick={handleGuardarFoto}>
                Usar foto
                </Button>
                )}
                <DialogActions>
    <Button onClick={() => handleDialogClose(false)}>Cancelar</Button>
  </DialogActions>
                {camaraVisible && (
                <Button variant="contained" color="primary" onClick={handleFoto}>
                Tomar foto
                </Button>
                )}
            </DialogActions>
          </Dialog>
      </>
      );
      };

      export default ImageDropzone