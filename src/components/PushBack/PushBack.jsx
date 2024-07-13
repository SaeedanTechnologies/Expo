import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
const PushBack = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        mr: 2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:active": {
          backgroundColor: "transparent",
        },
      }}
    >
      <ArrowBackIcon sx={{ fontSize: "50px" }} />
    </IconButton>
  );
};

export default PushBack;
