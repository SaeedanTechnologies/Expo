import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, Box, Typography, useTheme, Button, useMediaQuery } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { iframeApi } from '../../store/actions/contestStartActions';
import { useSnackbar } from "notistack";

const IframeLink = () => {
  const { id } = useParams();
  const [iframeLink, setIframeLink] = useState('');
  const [link, setLink] = useState(''); // Will store the iframe link text
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Dynamically create iframe link using template literals
    const link = `<iframe src="${window.location.origin}/public_all-records/${id}" width="100%" height="500px"></iframe>`;
    setIframeLink(link);
  }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await dispatch(iframeApi(id));
  //       const { iframe_link } = response.data;
  //       setIframeLink(iframe_link);
  //       setLink(iframe_link); // Set the link to the iframe link text
  //     } catch (error) {
  //       console.error("Error fetching iframe link:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeLink);
          enqueueSnackbar("Link Copied", { variant: "success" });

  };

  const handleNext = () => {
    navigate('/public-screen');
  };

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (


    <Box sx={{ padding: isSmall ? '2rem 10%' : '2rem 30%' }}>
      <Typography variant='h1' sx={{ fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Iframe Link</Typography>
      <Typography>Copy iframe Link</Typography>
      <br/>
      <div style={{ position: 'relative' }}>
        <TextField
          sx={{ backgroundColor: '#eeeeee', borderRadius: '5px' }}
          value={iframeLink}
          multiline
          fullWidth
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy}>
                  <ContentCopyIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <br/>
      <Button variant='contained' fullWidth onClick={handleCopy}>Copy Link</Button>
      <br/><br/>

    </Box>
  );
};

export default IframeLink;
