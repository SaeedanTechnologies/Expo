import React from "react";
import { Box, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ShieldIcon from '@mui/icons-material/Shield';
const Positions = ({ number, color }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <ShieldIcon sx={{ color: color, fontSize: 30 }} />
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {number}
      </Typography>
    </Box>
  );
};

export default Positions;
