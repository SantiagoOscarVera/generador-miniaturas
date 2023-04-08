import React, { ReactNode, useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import Section from "./section";
import Camara from "./camara";
import { toPng } from "html-to-image";


type SidebarProps = {
  children: ReactNode;
  onDownload: () => Promise<void>;
  onClear: () => void;
  onLinks:() => void;
};

const Sidebar = ({ children, onDownload, onClear, onLinks }: SidebarProps) => {

  return (
    <Box minWidth={360}sx={{ border: 1}} style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <Box className="box2" p={1} display="flex" flexDirection="column"  height="100%" >
        <Box className="box2"  >
          {children}
          <Box title="" textAlign="center" >
          <Typography variant="h5"  style={{ marginBottom: '15px', textDecoration: 'underline'}}>Generate your thumbnail</Typography>
          <Camara />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="flex-end" margin="auto">
          <Button 
          size="small"
          variant="outlined"
          style={{backgroundColor: "#eceff1", marginBottom: "5%", fontSize: "12px"}} 
          startIcon={< AutoAwesomeSharpIcon />}
          onClick={onClear}>
            Clear image
          </Button>
          <Button 
          size="small"
          variant="contained"
          style={{ marginBottom: "5%", fontSize: "12px"}}
          startIcon={< OpenInNewSharpIcon />} 
          onClick={onLinks}>
            Previous image links
          </Button>
          <Button
          size="small"
            variant="contained"
            style={{ backgroundColor: "#065fd4",    marginBottom: "5%",  fontSize: "12px"}}
            startIcon={<CloudDownloadIcon />}
            onClick={onDownload}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
