import { Box, Container, Typography ,Avatar} from '@mui/material'
import React from 'react'
import DynTable2 from './DynTable2'
import img1 from "../../../assets/adim-screen/image1.png"
import img2 from "../../../assets/adim-screen/image2.png"
import img3 from "../../../assets/adim-screen/image2.png"
import imagebackground from "../../../assets/adim-screen/imageback.png"
import imgfrm1 from "../../../assets/adim-screen/imagfram1.png"
import imgfrm2 from "../../../assets/adim-screen/imagfram2.png"
import imgfrm3 from "../../../assets/adim-screen/imagfram1.png"
import JudgeRoleTable from './JudgeRoleTable'
import AllReacordTable from './AllReacordTable'
const AllRecord = () => {
    const data = [
        { image: img1, img: imgfrm1,name:'usma', score: 95 },
        { image: img2, img: imgfrm1, name:'ali', score: 90 },
        { image: img3, img: imgfrm1, name:'Abdullah', score: 85 },
        { image: img1, img: imgfrm1,name:'usma', score: 95 },
        { image: img2, img: imgfrm1, name:'ali', score: 90 },
        { image: img3, img: imgfrm1, name:'Abdullah', score: 85 },
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
              color: 'black',
              fontFamily: 'Roboto',
              fontSize: '46px',
              fontWeight: 800,
              lineHeight: '36px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          > 
          All Records   
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
              color:'#949494'
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br></br>sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>
          <AllReacordTable data={data}/>
        </Box>
      </Container>
    </Box>
  );
}

export default AllRecord;
