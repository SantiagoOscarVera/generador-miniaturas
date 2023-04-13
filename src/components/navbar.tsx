import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./auth0/login";
import { LogoutButton } from "./auth0/logout";
import Profile from "./auth0/profile";
import { Link } from "react-router-dom";

interface NavbarProps {
  checked: boolean;
  onChange: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ checked, onChange }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <AppBar style={{ backgroundColor: "#dd2c00", height: "40px" }}>
      <Toolbar style={{ minHeight: "40px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} sm={4} style={{ justifyContent: "flex-start" }}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant={window.innerWidth < 600 ? "subtitle2" : "h6"}>
                Thumbnail Generator
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} style={{ justifyContent: "center" }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={onChange} />}
              label="Activar vista previa"
            />
          </Grid>
          <Grid item xs={6} sm={4} container>
  <Grid container direction="row-reverse" alignItems="center" spacing={1}>
    {isAuthenticated && (
      <>
        <Grid item>
          <LogoutButton />
        </Grid>
        <Grid item>
          <Profile />
        </Grid>
      </>
    )}
    {!isAuthenticated && (
      <Grid item>
        <LoginButton />
      </Grid>
    )}
  </Grid>
</Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



/* import React  from "react";
import { AppBar, Toolbar, Typography, Box, FormControlLabel, Switch} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./auth0/login";
import { LogoutButton } from "./auth0/logout";
import  Profile  from "./auth0/profile";
import { Link } from "react-router-dom";
interface NavbarProps {
  checked: boolean;
  onChange: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ checked, onChange }) => {
  
  const { isAuthenticated } = useAuth0();
  return (
    <AppBar style={{ backgroundColor: "#dd2c00", height: "40px" }}>
      <Toolbar style={{ minHeight: "40px" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Link to="/"  style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" >Thumbnail Generator</Typography>
          </Link>
          <FormControlLabel
            control={<Switch checked={checked} onChange={onChange} />}
            label="Activar vista previa"
          />
          {isAuthenticated && (
            <Box display="flex" alignItems="center">
              <Box 
                mr={2} 
              >
                <Profile/>
              </Box>
              <LogoutButton />
            </Box>
          )}
          {!isAuthenticated && <LoginButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; */

