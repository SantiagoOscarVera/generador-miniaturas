import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../components/Header';
import PlaceToVisit from '../components/PlaceToVisit';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/yt4.webp'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default function Landing(): JSX.Element {
  const classes: Record<string, string> = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  );
}
