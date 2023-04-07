import React, { createRef, RefObject, useState } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import { Button} from "@material-ui/core";
import Swal from 'sweetalert2'


interface CamaraState {
  imagen: string | null;
}

const Camara = () => {
  const webcamRef: RefObject<Webcam> = createRef<Webcam>();
  const [state, setState] = useState<CamaraState>({ imagen: null });
  const [camaraVisible, setCamaraVisible] = useState<boolean>(true);
  const [capturaVisible, setCapturaVisible] = useState<boolean>(false);

  const foto = (): void => {
    if (webcamRef.current) {
      const captura = webcamRef.current.getScreenshot();
      console.log(captura);
      setState({ imagen: captura });
      setCapturaVisible(true);
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
        icon: 'info',
        title: 'Arrastra la captura hasta el centro'
      })
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

  return (
    <Box >
      {camaraVisible && (
        <Webcam
          audio={false}
          height={130}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={310}
        />
      )}
      <br />
      {camaraVisible && (
        <Button variant="contained" color="primary" size="small" style={{ marginBottom: '2%', fontSize: "10px" }} onClick={foto}>Hacer captura</Button>
      )}
      <br />
      <Button variant="contained" color="default" size="small" style={{ marginBottom: '57px', fontSize: "10px" }} onClick={toggleCamara}>
        {camaraVisible ? "Ocultar cámara" : "Mostrar cámara"}
      </Button>
      {capturaVisible && (
        <Box style={{ marginTop: '-13%' }}>
          
          <img src={state.imagen || ""} alt="" height="125" width="180" margin-top= '-100px' />
          <br />
          <Button variant="contained" color="default" size="small" style={{ marginBottom: '10%', fontSize: "10px" }} onClick={ocultarCaptura}>Ocultar captura</Button>
        </Box>
      )}
    </Box>
  );
};

export default Camara;

/* import React, { createRef, RefObject, useState } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import { Button} from "@material-ui/core";


interface CamaraState {
  imagen: string | null;
}

const Camara = () => {
  const webcamRef: RefObject<Webcam> = createRef<Webcam>();
  const [state, setState] = useState<CamaraState>({ imagen: null });
  const [camaraVisible, setCamaraVisible] = useState<boolean>(true);
  const [capturaVisible, setCapturaVisible] = useState<boolean>(false);

  const foto = (): void => {
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

  return (
    <Box >
      {camaraVisible && (
        <Webcam
          audio={false}
          height={130}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={310}
        />
      )}
      <br />
      {camaraVisible && (
        <Button variant="contained" color="primary" size="small" style={{ marginBottom: '2%', fontSize: "10px" }} onClick={foto}>Hacer captura</Button>
      )}
      <br />
      <Button variant="contained" color="default" size="small" style={{ marginBottom: '57px', fontSize: "10px" }} onClick={toggleCamara}>
        {camaraVisible ? "Ocultar cámara" : "Mostrar cámara"}
      </Button>
      {capturaVisible && (
        <Box style={{ marginTop: '-13%' }}>
          
          <img src={state.imagen || ""} alt="" height="125" width="180" margin-top= '-100px' />
          <br />
          <Button variant="contained" color="default" size="small" style={{ marginBottom: '10%', fontSize: "10px" }} onClick={ocultarCaptura}>Ocultar captura</Button>
        </Box>
      )}
    </Box>
  );
};

export default Camara;
 */

