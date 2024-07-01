import { Box, TextField, Typography, InputAdornment, IconButton, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLocation } from 'react-router';

const Links = () => {

  const location = useLocation();
  const { contest_id } = location.state || {};


  const adminlink = `https://frontend.saeedantechpvt.com/admin-contest-start/${contest_id}`;
  const judgelink = `https://frontend.saeedantechpvt.com/judge-login`;
  const behindscreenlink = `https://frontend.saeedantechpvt.com/`;


const theme = useTheme()
    const handleCopyAdminLink = () => {
    navigator.clipboard.writeText(adminlink);
    alert("Admin Link copied to clipboard!");
  };
  const handleCopyJudgeLink = () => {
    navigator.clipboard.writeText(judgelink);
    alert("Judge Link copied to clipboard!");
  };
  const handleCopyBehindLink = () => {
    navigator.clipboard.writeText(behindscreenlink);
    alert("BehindLink copied to clipboard!");
  };

const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: isSmall ? '0rem 10%': '0rem 30%' }}>
      <Box>
        <Typography sx={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>Links</Typography>
        <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, ducimus!
          Lorem ipsum dolor, sit amet cing elit. Dolorem, ducimus!
        </Typography>

        <Box sx={{ mt: 2 }}>

          <Typography sx={{fontSize:'1rem', fontWeight:600, mb:1}}>Operator Screen Link</Typography>
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
                    <ContentCopyIcon sx={{color:theme.palette.primary.main}}/>
                  </IconButton>
                </InputAdornment>
              )
            }}
            fullWidth
            size='small'

          />
        </Box>

        <Box sx={{ mt: 2 }}>

          <Typography sx={{fontSize:'1rem', fontWeight:600, mb:1}}>judge Screen Link</Typography>

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
                  <IconButton onClick={handleCopyJudgeLink} sx={{color:theme.palette.primary.main}}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            fullWidth
            size='small'
          />


        </Box>


        <Box sx={{ mt: 2 }}>
          <Typography sx={{fontSize:'1rem', fontWeight:600, mb:1}}>Behind Stage Screen Link</Typography>


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
                  <IconButton onClick={handleCopyBehindLink} sx={{color:theme.palette.primary.main}}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            fullWidth
            size='small'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Links;
