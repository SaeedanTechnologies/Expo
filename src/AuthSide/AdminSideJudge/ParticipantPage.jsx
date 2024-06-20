// import { Box, Typography } from '@mui/material'
// import React from 'react'

// const ParticipantPage = () => {
//   return (
//     <>

// <Box
//         sx={{
//           backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${"/bgimage.png"})`,

//           backgroundPosition: "center",
//           backgroundSize: "cover",

//           backgroundRepeat: "no-repeat",
//           height: "100vh",
//           width: "100vw",
//         }}
//       >

// <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>

// <Box>

// <Box sx={{border:'1px solid red', padding:'1rem', color:'white', backgroundColor:'#162f33'}}>
// <Typography>Participant : 05</Typography>
// <Typography>Total Score</Typography>
// <Box sx={{backgroundColor:'#7c8385'}}>
// <Typography>Name Name Name </Typography>

// </Box>
// </Box>

// </Box>

// </Box>

//       </Box>


//     </>
//   )
// }

// export default ParticipantPage



import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';

const participants = [
  { name: 'Ruhan Ahmad', task: 'Line Shading', score: 7.8 },
  { name: 'Muaz Ahmad', task: 'Design', score: 7.8 },
  { name: 'Haidar Yasin', task: 'Shading', score: 7.8 },
  { name: 'Abdul Salam', task: 'Livework', score: 7.8 },
  { name: 'Khawar Dogar', task: 'Design', score: 7.8 },
  { name: 'Ruhan Ahmad', task: 'Line Shading', score: 7.8 },
  { name: 'Muaz Ahmad', task: 'Design', score: 7.8 },
  { name: 'Haidar Yasin', task: 'Shading', score: 7.8 },
  { name: 'Abdul Salam', task: 'Livework', score: 7.8 },
  { name: 'Khawar Dogar', task: 'Design', score: 7.8 },
  // Add more participants as needed
];

const ParticipantCard = ({ name, task, score }) => (
  <Card>
    <Box>
      {/* <Avatar sx={{ width: 56, height: 56, mb: 2 }} /> */}
      <img src='/person.png' alt='image' width={'100%'}/>
      <Typography variant="h6" sx={{fontSize:'1rem', textAlign:'center', backgroundColor:'#7c8385', color:'white'}}>{name}</Typography>
<Box sx={{display:'flex', padding:'0.5rem', justifyContent:'space-between', alignItems:'center'}}>
<Typography variant="subtitle1" sx={{fontSize:'0.9rem', fontWeight:600}}>{task}</Typography>
<Typography variant="h5" sx={{fontSize:'0.9rem', color:'red', fontWeight:600}}>{score}</Typography>
</Box>

    </Box>
  </Card>
);

const ScoreBoard = () => {
  return (
<>


<Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'column', height:'35vh', backgroundColor:'#162f33', color:'white'}}>

<Typography variant="h4" sx={{fontSize:'1rem', mt:'1rem'}}>Participant : 05</Typography>
      <Typography variant="h5" sx={{fontSize:'1.3rem', fontWeight:600}}>Total Score : 78</Typography>
    <Typography variant="h6" sx={{fontSize:'1rem',textAlign:'center', color:'white', backgroundColor:'#7c8385', width:'100%'}}>Sefalina Amato</Typography>
</Box>
</>
);
};

const PartcipantPage = () => (


    <Box
    sx={{
      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${"/bgimage.png"})`,

      backgroundPosition: "center",
      backgroundSize: "cover",

      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
    }}
  >
  <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'90vh', padding:'1rem 5%' }}>
    <Grid container spacing={4} sx={{alignItems:'start'}}>
      <Grid item xs={12} sm={2.5}>

<Box>
<ScoreBoard />

</Box>
      </Grid>
      <Grid item xs={12} sm={9.5}>
        <Grid container spacing={2}>
          {participants.map((participant, index) => (
            <Grid item xs={12} sm={6} md={2.3} key={index}>
              <ParticipantCard {...participant} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Box>
  </Box>

);

export default PartcipantPage;
