import React from "react";
import { Button, Box } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";

interface CustomLogoutOptions extends LogoutOptions {
  returnTo?: string;
}

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        style={{ backgroundColor: "#065fd4", color: "black", minWidth: 0 }}
        size="small"
        variant="outlined"
        onClick={() => logout({ returnTo: window.location.origin } as CustomLogoutOptions)}
      >
        <LogoutIcon style={{ fontSize: "16px" }} />
      </Button>
    </Box>
  );
};
