import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import homeimg from "../assets/adim-screen/homePage.png"
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Box sx={{ backgroundColor: "#4752b7", minHeight: "60vh" }}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item lg={6} md={6} sm={12} xs={12}></Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <img src={homeimg} alt="Home Image" width={"80%"} />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/all-events");
            }}
          >
            View Past Events
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
