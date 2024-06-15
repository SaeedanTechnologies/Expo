import { Box, TextField, Typography, InputAdornment, IconButton, useTheme } from '@mui/material';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Links = () => {
  const link = "https://example.com/operator-screen";
const theme = useTheme()
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };


  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', padding:'0rem 30%' }}>
      <Box>
        <Typography sx={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>Links</Typography>
        <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, ducimus!
          Lorem ipsum dolor, sit amet cing elit. Dolorem, ducimus!
        </Typography>

        <Box sx={{ mt: 2 }}>

          <Typography sx={{fontSize:'1rem', fontWeight:600, mb:1}}>Operator Screen Link</Typography>
          <TextField
            value={link}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink}>
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
            value={link}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} sx={{color:theme.palette.primary.main}}>
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
            value={link}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} sx={{color:theme.palette.primary.main}}>
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
