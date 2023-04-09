import React  from "react";
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

export default Navbar;

