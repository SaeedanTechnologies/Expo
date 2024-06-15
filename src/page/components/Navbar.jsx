import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  FormControl,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "0rem 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "static",
          top: 0,
          zIndex: 10000000,
          boxShadow: "1px 1px 1px #ededed",
        }}
      >
        <Box>
          <Link to="/">
            <img
              src="/mainLogo.png"
              alt="Logo"
              style={{ height: "auto", width: "100%" }}
            />
          </Link>
        </Box>

        {/* Desktop view */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on extra small screens (mobile)
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Upgrade your pricing plan
            </Button>
          </Box>

          <FormControl sx={{ padding: 0 }}>
            <Select
              sx={{
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the outline border
                },
              }}
              displayEmpty
              inputProps={{ "aria-label": "Select user" }}
              style={{ minWidth: "120px", padding: 0 }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar />
                  <Typography sx={{ fontSize: "1rem" }}> user</Typography>
                </Box>
              )}
            >
              <MenuItem sx={{ fontSize: "0.8rem" }}>Manage Profile</MenuItem>
              <MenuItem sx={{ fontSize: "0.8rem" }}>Manage Judges</MenuItem>
              <MenuItem sx={{ fontSize: "0.8rem" }}>Logout</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Mobile view */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton onClick={handleDrawerOpen} sx={{ padding: "10px" }}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{ zIndex: 10000000 }}
          >
            <Box sx={{ width: 250, padding: "20px" }}>



            <Box

        >
          <Box>
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Upgrade your pricing plan
            </Button>
          </Box>

          <FormControl sx={{ padding: 0 }}>
            <Select
              sx={{
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              displayEmpty
              inputProps={{ "aria-label": "Select user" }}
              style={{ minWidth: "120px", padding: 0 }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar />
                  <Typography sx={{ fontSize: "1rem" }}> user</Typography>
                </Box>
              )}
            >
              <MenuItem sx={{ fontSize: "0.8rem" }}>Manage Profile</MenuItem>
              <MenuItem sx={{ fontSize: "0.8rem" }}>Manage Judges</MenuItem>
              <MenuItem sx={{ fontSize: "0.8rem" }}>Logout</MenuItem>
            </Select>
          </FormControl>
        </Box>

            </Box>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
