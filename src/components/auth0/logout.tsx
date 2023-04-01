import React from "react";
import {
    Button
  } from "@material-ui/core";
  import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";

interface CustomLogoutOptions extends LogoutOptions {
  returnTo?: string;
}

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button  style={{ backgroundColor: "#065fd4", color:"black" }} size="small" variant="outlined" /* startIcon={<LogoutIcon />} */ onClick={() => logout({ returnTo: window.location.origin } as CustomLogoutOptions)}> 
    <LogoutIcon style={{ fontSize: "16px" }}/>
    </Button>
  );
};
