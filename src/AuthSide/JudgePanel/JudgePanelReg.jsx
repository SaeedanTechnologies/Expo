import { Box, Container, Typography ,Avatar} from '@mui/material'
import React from 'react'


const JudgePanelReg = () => {

  
  return (

    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'12px' }}>
        <Typography
          variant='h4'
          sx={{
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: {xs:"22px", md:'46px'},
            fontWeight: 800,
            lineHeight: '36px',
            textAlign: 'center',
            marginBottom: '1rem'
          }}
        >
        Contest Name
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
     
      </Box>
    </Container>
 
  );
};

export default JudgePanelReg;
