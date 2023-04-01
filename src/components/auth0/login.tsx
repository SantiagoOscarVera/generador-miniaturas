import React from "react";
import {
    Button
  } from "@material-ui/core";
  import LoginIcon from '@mui/icons-material/Login';
  import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button 
  style={{ backgroundColor: "#065fd4", color:"black" }} 
  size="small" 
  variant="outlined" 
  startIcon={<AccountCircleOutlinedIcon />} 
  onClick={() => loginWithRedirect()}>Login
  </Button>;
};
