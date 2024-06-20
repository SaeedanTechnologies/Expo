import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import DynTable from './DynTable';
import img1 from "../../../assets/adim-screen/image1.png";
import img2 from "../../../assets/adim-screen/image2.png";
import img3 from "../../../assets/adim-screen/image2.png";
import imagebackground from "../../../assets/adim-screen/imageback.png";
import imgfrm1 from "../../../assets/adim-screen/imagfram1.png";
import imgfrm2 from "../../../assets/adim-screen/imagfram2.png";
import imgfrm3 from "../../../assets/adim-screen/imagfram1.png";
import Group1 from "../../../assets/adim-screen/Group1 (1).png";
import Group2 from "../../../assets/adim-screen/Group1 (2).png";
import Group3 from "../../../assets/adim-screen/Group1 (3).png";

const AdminSideScreen2 = () => {
  const data = [
    { image: img1, img: imgfrm1, score: 95 },
    { image: img2, img: imgfrm1, score: 90 },
    { image: img3, img: imgfrm1, score: 85 }
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
        backgroundRepeat: 'no-repeat',
        padding: { xs: '16px', md: '78px' } 
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '16px', md: '78px' } ,
          
          }}
        >
          <Typography
            variant='h4'
            sx={{
              color: 'white',
              fontFamily: 'Roboto',
              fontSize: { xs: '32px', md: '46px' }, // Responsive font size
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
              fontFamily: 'Roboto',
              fontSize: { xs: '16px', md: '20px' }, // Responsive font size
              fontWeight: '400',
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'white'
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>
          <Box sx={{ marginBottom: { xs: '16px', md: '32px' } }}> {/* Responsive margin */}
            <img src={Group3} alt='' style={{ maxWidth: '100%' }} /> {/* Ensure image is responsive */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap', // Allow wrapping for small screens
              gap: '16px' // Space between items
            }}
          >
          <Box sx={{ marginRight: { xs: '0px', md: '33px' } }}>
          <img src={Group1} alt='Group 1' />
        </Box>
        <Box sx={{ marginLeft: '44px' }}>
          <img src={Group2} alt='Group 2' />
        </Box>
        
          </Box>
          <DynTable data={data} />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminSideScreen2;
