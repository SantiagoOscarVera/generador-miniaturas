import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, Typography } from "@material-ui/core";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {isAuthenticated && (
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            {user?.name && <Typography> ¡Bienvenido/a {user.name}!</Typography>}
          </Grid>
          <Grid item>
            {user?.picture && (
              <Box
                mr={2}
                display="flex"
                alignItems="center"
                borderRadius="50%"
                overflow="hidden"
                width="30px"
                height="30px"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Profile;
