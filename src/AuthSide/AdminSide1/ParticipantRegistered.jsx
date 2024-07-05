import { Box, Typography } from '@mui/material'
import React from 'react'

const ParticipantRegistered = () => {
  return (
    <>

<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh', flexDirection:'column'}}>


<Box>
  <img src='/mainLogo.png' alt='Expo' width={'100%'}/>
</Box>
<br/>


<Box>
  <img src='/done.svg' alt='Expo' width={'100%'}/>
</Box>
<br/>

<Typography variant='h1' sx={{fontSize:'2rem', textAlign:'center', fontWeight:600}}> You are Registered Successfully </Typography>

</Box>


    </>
  )
}

export default ParticipantRegistered