import React from 'react';
import { Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

type ImageDropzoneProps = {
  onDrop: (files: File[]) => void;
};

const ImageDropzone = ({ onDrop }: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'currentColor',
        backgroundColor: "#eceff1",
        width: 600,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Typography variant="h5">Drag your thumbnail layout here</Typography>
    </Box>
  );
};

export default ImageDropzone;

/* import React from 'react';
import { Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

type ImageDropzoneProps = {
  onDrop: (files: File[]) => void;
};

const ImageDropzone = ({ onDrop }: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'currentColor',
        backgroundColor: "#eceff1",
        width: 600,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Typography variant="h5">Drag your thumbnail layout here</Typography>
    </Box>
  );
};

export default ImageDropzone; */


