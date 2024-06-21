import React from "react";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import imgAdmin from "../../assets/adim-screen/Imagejudeg.png";
import img1 from "../../assets/adim-screen/image1.png";
import img2 from "../../assets/adim-screen/image2.png";
import frm from "../../assets/adim-screen/fram.png";
const participants = [
  { name: "Ruhan Ahmad", task: img1, score: 7.8 },
  { name: "Muaz Ahmad", task: img2, score: 7.8 },
  { name: "Haidar Yasin", task: img1, score: 7.8 },
  { name: "Abdul Salam", task: img2, score: 7.8 },
  { name: "Haidar Yasin", task: img1, score: 7.8 },
  { name: "Abdul Salam", task: img2, score: 7.8 },
  // Add more participants as needed
];

const ParticipantCard = ({ name, task }) => (
    <Card sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'relative', width: '100%' }}>
      <img src={imgAdmin} alt="image" width="100%" style={{ display: 'block' }} />
      <img 
        src={frm} 
        alt="image" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0,
          width: '50px', 
          height: 'auto'
        }} 
      />
    </Box>
    <Typography
      variant="h6"
      sx={{
        fontSize: '1rem',
        textAlign: 'center',
        backgroundColor: '#7c8385',
        color: 'white',
        width: '100%',
        
      }}
    >
      {name}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontSize: '1rem',
        textAlign: 'center',
        color: 'black',
        padding: '12px',
        width: '100%',
      }}
    >
      <img src={task} alt="task image" style={{ maxWidth: '100%' }} />
    </Typography>
  </Card>
);

const ContentData = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: "Roboto",
            fontSize: { xs: "22px", md: "46px" },
            fontWeight: 800,
            lineHeight: "36px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Convention Name
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "28px",
            textAlign: "center",
            marginBottom: "2rem",
            color: "white",
          }}
        >
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br></br>sit
          amet consectetur lorem ipsum dolor sit amet.
        </Typography>
      </Box>
    </Box>
  );
};

const JudgeAdminPanelParticipant = () => (
  <Box
    sx={{
      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${"/bgimage.png"})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100%",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "1rem 5%",
      }}
    >
      <Grid container spacing={4} sx={{ alignItems: "start" }}>
        <Grid item xs={12} sm={12} md={12}>
          <ContentData />
          <Grid container spacing={2}>
            {participants.map((participant, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <ParticipantCard {...participant} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            sx={{
              background: "linear-gradient(180deg, #D90B0F 0%, #8F1B1E 100%)",
              color: "white",
              padding: "16px",
              width: "100%",
            }}
          >
            Rematch
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default JudgeAdminPanelParticipant;
