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
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const isHidden = location.pathname === "/participant-page" || location.pathname === "/admin_side_screen1" || location.pathname === "/admin_side_screen2";

  if (isHidden) {
    return null;
  }


  return (
    <Box sx={{ backgroundColor: "white", padding: "0rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "static", top: 0, zIndex: 10000000, boxShadow: "1px 1px 1px #ededed" }}>
      <Box>
        <Link to="/">
          <img src="/mainLogo.png" alt="Logo" style={{ height: "auto", width: "100%" }} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" sx={{ textTransform: "none" }}>Upgrade your pricing plan</Button>
        <FormControl sx={{ padding: 0 }}>
          <Select
            sx={{ outline: "none", "&:focus": { outline: "none" }, "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            displayEmpty
            inputProps={{ "aria-label": "Select user" }}
            style={{ minWidth: "120px", padding: 0 }}
            renderValue={() => (
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
      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <IconButton onClick={handleDrawerOpen} sx={{ padding: "10px" }}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose} sx={{ zIndex: 10000000 }}>
          <Box sx={{ width: 250, padding: "20px" }}>
            <Button variant="contained" sx={{ textTransform: "none" }}>Upgrade your pricing plan</Button>
            <FormControl sx={{ padding: 0 }}>
              <Select
                sx={{ outline: "none", "&:focus": { outline: "none" }, "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                displayEmpty
                inputProps={{ "aria-label": "Select user" }}
                style={{ minWidth: "120px", padding: 0 }}
                renderValue={() => (
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
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
