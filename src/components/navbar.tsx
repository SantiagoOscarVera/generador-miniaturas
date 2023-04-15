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
        <Grid container justifyContent="space-between" alignItems="center" >

          <Grid item xs={4} sm={4} style={{ justifyContent: "flex-start",  }} className= "titulo">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant={window.innerWidth < 600 ? "subtitle2" : "h6"}>
                Thumbnail Generator
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} style={{ justifyContent: "center", maxWidth: "19%" }} className="Vista" container justifyContent="center">
  <FormControlLabel
    control={<Switch size="small" checked={checked} onChange={onChange} />}
    label={
      <Typography 
        variant="body2" 
        style={{ fontSize: "75%", lineHeight: "1" }}>
        Activar vista previa
      </Typography>
    }
  />
</Grid>

          <Grid item xs={3} sm={4} container className= "profile">
                <Grid container direction="row-reverse" alignItems="center" spacing={1} >
                  {isAuthenticated && (
                    <>
                      <Grid >
                        <LogoutButton />
                      </Grid>
                      <Grid >
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



