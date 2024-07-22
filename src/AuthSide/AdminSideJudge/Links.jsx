import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useLocation, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import PushBack from "../../components/PushBack/PushBack";
const Links = () => {
  const location = useLocation();
  const { contest_id } = location.state || {};
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const adminlink = `${window.location.origin}/admin-contest-start/${contest_id}`;
  const judgelink = `${window.location.origin}/judge-login`;
  const behindscreenlink = `${window.location.origin}/public-screen/${contest_id}`;
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleCopyAdminLink = () => {
    navigator.clipboard.writeText(adminlink);
    enqueueSnackbar("Admin Link copied to clipboard!", { variant: "success" });
  };
  const handleCopyJudgeLink = () => {
    navigator.clipboard.writeText(judgelink);

    enqueueSnackbar("Judge Link copied to clipboard!", { variant: "success" });
  };
  const handleCopyBehindLink = () => {
    navigator.clipboard.writeText(behindscreenlink);
    enqueueSnackbar("BehindLink copied to clipboard!!", { variant: "success" });
  };

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleNext = () => {
    // dispatch({
    //   type: "RESET_STATE",
    // });
    localStorage.removeItem("judges");
    navigate(`/admin-contest-start/${contest_id}`);
  };

  const handleFile = () => {
    navigate(`/upload-file/${contest_id}`);
  };
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: isSmall ? "0rem 10%" : "0rem 30%",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PushBack />
          <Typography
            sx={{ fontSize: "2rem", fontWeight: 600, textAlign: "center" }}
          >
            Links
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "1rem", textAlign: "center" }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
          ducimus! Lorem ipsum dolor, sit amet cing elit. Dolorem, ducimus!
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            Operator Screen Link
          </Typography>
          <TextField
            value={adminlink}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyAdminLink}>
                    <ContentCopyIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            judge Screen Link
          </Typography>

          <TextField
            value={judgelink}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCopyJudgeLink}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            Behind Stage Screen Link
          </Typography>

          <TextField
            value={behindscreenlink}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCopyBehindLink}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
          />
        </Box>

        <br />
      </Box>
      <Button variant="contained" sx={{ width: "100%" }} onClick={handleNext}>
        Next
      </Button>
      <br />
      {/*<Button variant='contained' sx={{width:'100%'}} onClick={handleFile}>Upload File</Button> */}
    </Box>
  );
};

export default Links;
