import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false); // Agrega una variable de estado para el CircularProgress.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: File[]) => {
      // Set the showImage state to false to hide the image.
      setShowImage(false);

      // Set the loading state to true to show the CircularProgress.
      setLoading(true);

      // Wait for 10 seconds before displaying the image.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set the loading state to false to hide the CircularProgress.
      setLoading(false);

      // Set the showImage state to true to display the image.
      setShowImage(true);

      // Call the onDrop callback with the selected files.
      onDrop(files);
    }
  });
  const classes = useStyles();
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

      {showImage ? (
        <img src="url_de_la_imagen" alt="thumbnail layout" />
      ) : (
        <Typography variant="h5" className={loading ? classes.hidden : undefined}>Drag your thumbnail layout here</Typography>
      )}

      {loading && <CircularProgress color="secondary" />} {/* Muestra el CircularProgress si la variable de estado `loading` es verdadera. */}
    </Box>
  );
};

export default ImageDropzone;
