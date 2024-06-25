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
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false);
const theme = useTheme()
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

const auth = useSelector((state)=>state?.admin?.isAuthenticated)

  return (
    <Box sx={{ backgroundColor: "white", padding: "0rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "static", top: 0, zIndex: 10000000, boxShadow: "1px 1px 1px #ededed" }}>
      <Box>
        <Link to="/">
          <img src="/mainLogo.png" alt="Logo" style={{ height: "auto", width: "100%" }} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" sx={{ textTransform: "none" }}>Upgrade your pricing plan</Button>
        {/* <FormControl sx={{ padding: 0 }}>
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
        </FormControl> */}



        <Box
              sx={{
                display: "flex",
                alignItems: "center",

                cursor: "pointer",
              }}
            >
              {auth ? (
                <Box>
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
                      // value={selectedValue}
                      // onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Select user" }}
                      style={{ minWidth: "120px", padding: 0 }}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt=""

                            // src={userData ? `${base}${userData?.profile_image}` : ""}
                            sx={{ height:'2rem', width:'2rem', marginRight: "8px" }}
                          />
                         <Typography sx={{fontSize:'1rem'}}> user </Typography>
                        </Box>
                      )}
                    >
                      <MenuItem

                        sx={{fontSize:'0.8rem'}}

                      >
                        Manage Profile
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}

                      >
                        Booking
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}


                      >
                        History
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}

                        value="Logout"
                        // onClick={() => handleMenuItemClick("Logout")}
                      >
                        Logout
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Button
                  // onClick={handleSignup}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "0.5rem 2rem",
                    textTransform: "none",
                    fontSize:'0.9rem'
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
      </Box>
      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <IconButton onClick={handleDrawerOpen} sx={{ padding: "10px" }}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose} sx={{ zIndex: 10000000 }}>
          <Box sx={{ width: 250, padding: "20px" }}>
            <Button variant="contained" sx={{ textTransform: "none" }}>Upgrade your pricing plan</Button>



            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                cursor: "pointer",
              }}
            >
              {auth ? (
                <Box>
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
                      // value={selectedValue}
                      // onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Select user" }}
                      style={{ minWidth: "120px", padding: 0 }}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt=""

                            // src={userData ? `${base}${userData?.profile_image}` : ""}
                            sx={{ height:'2rem', width:'2rem', marginRight: "8px" }}
                          />
                         <Typography sx={{fontSize:'1rem'}}> user </Typography>
                        </Box>
                      )}
                    >
                      <MenuItem

                        sx={{fontSize:'0.8rem'}}

                      >
                        Manage Profile
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}

                      >
                        Booking
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}


                      >
                        History
                      </MenuItem>

                      <MenuItem
                        sx={{fontSize:'0.8rem'}}

                        value="Logout"
                        // onClick={() => handleMenuItemClick("Logout")}
                      >
                        Logout
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Button
                  // onClick={handleSignup}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "0.5rem 2rem",
                    textTransform: "none",
                    fontSize:'0.9rem'
                  }}
                >
                  Login
                </Button>
              )}
            </Box>






            {/* <FormControl sx={{ padding: 0 }}>
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
            </FormControl> */}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
