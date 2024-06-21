import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import DynTable from './DynTable';
import imgfrm1 from "../../../assets/adim-screen/imagfram1.png";
import imgfrm2 from "../../../assets/adim-screen/imagfram2.png";
import imgfrm3 from "../../../assets/adim-screen/imagfram1.png";
import imagebackground from "../../../assets/adim-screen/imageback.png";

const AdminSideScreen = () => {
  const data = [
    { position: 1, img: imgfrm1, name: 'Participant 1', score: 95 },
    { position: 2, img: imgfrm2, name: 'Participant 2', score: 90 },
    { position: 3, img: imgfrm3, name: 'Participant 3', score: 85 }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${imagebackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'12px', padding:'1rem' }}>
          <Typography
            variant='h4'
            sx={{
              color: 'white',
              fontFamily: 'Roboto',
              fontSize: { xs: '32px', md: '46px' },
              fontWeight: 800,
              lineHeight: '36px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            Results 
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontFamily: "Roboto",
              fontSize: { xs: '16px', md: '20px' },
              fontWeight: '400',
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '2rem',
              color:'white'
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit <br></br> amet consectetur lorem ipsum dolor sit amet.
          </Typography>
          <DynTable data={data} />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminSideScreen;
