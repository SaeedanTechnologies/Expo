import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import DynTable from './DynTable'
import img1 from "../../../assets/adim-screen/image1.png"
import img2 from "../../../assets/adim-screen/image2.png"
import img3 from "../../../assets/adim-screen/image2.png"
import imagebackground from "../../../assets/adim-screen/imageback.png"
import imgfrm1 from "../../../assets/adim-screen/imagfram1.png"
import imgfrm2 from "../../../assets/adim-screen/imagfram2.png"
import imgfrm3 from "../../../assets/adim-screen/imagfram1.png"
const AdminSideScreen = () => {
  const data = [
    { image: img1, img: imgfrm1,name:'usma', score: 95 },
    { image: img2, img: imgfrm1, name:'ali', score: 90 },
    { image: img3, img: imgfrm1, name:'Abdullah', score: 85 }
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'12px' }}>
          <Typography
            variant='h4'
            sx={{
              color: 'white',
              fontFamily: 'Roboto',
              fontSize: '46px',
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
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '2rem',
              color:'white'
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br></br>sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>
          <DynTable data={data} />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminSideScreen;
