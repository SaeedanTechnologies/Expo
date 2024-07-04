import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box, Typography, useTheme, Button, useMediaQuery } from '@mui/material';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import LinkIcon from '@mui/icons-material/Link';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router';

const IframeLink = () => {
    const theme = useTheme()
  const [link, setLink] = useState('https://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.comhttps://example.com'); // Replace with your link state

  const handleCopy = () => {
    navigator.clipboard.writeText(link);

    alert('Link Copied')
  };

  const navigate = useNavigate()
  const handleNext = ()=>{
    navigate('/pblic-screen')
  }

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  return (


    <>


    <Box sx={{
padding:isSmall ? '2rem 10%':'2rem 30%'
    }}>

<Typography variant='h1' sx={{fontWeight:700, fontSize:'2rem', textAlign:'center'}}>Iframe Link</Typography>
<Typography >Copy iframe Link</Typography>
<br/>


    <div style={{ position: 'relative', }}>
      <TextField
      sx={{backgroundColor:'#eeeeee', borderRadius:'5px'}}
        value={link}
        multiline
        fullWidth
        size='small'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy}>
                {/* <ContentCopyIcon sx={{ color: theme.palette.primary.main }} /> */}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <IconButton
        onClick={handleCopy}
        style={{
          position: 'absolute',
          right: 4,
          bottom: 4,
          zIndex: 1,
        }}
      >
        <ContentCopyIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </div>
<br/>
<Button variant='contained' fullWidth onClick={handleNext}>Copy Link</Button>
    </Box>

    </>
  );
};

export default IframeLink;
