


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   TextField,
//   Typography,
//   Avatar,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const AddJudgeMain = () => {
  
//   const [activeStep, setActiveStep] = useState(0);
//   const [judges, setJudges] = useState([{ judge_name: '', email: '', phone: '', profile_picture: '' }]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedJudges = JSON.parse(localStorage.getItem('judges'));
//     if (savedJudges) {
//       setJudges(savedJudges);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('judges', JSON.stringify(judges));
//   }, [judges]);

//   const handleNext = () => {
//     localStorage.setItem('judges', JSON.stringify(judges));
//     if (activeStep === judges.length - 1) {
//       navigate('/create-score-card', { state: { judges } });
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleAddNewJudge = () => {
//     const newJudges = [...judges, { judge_name: '', email: '', phone: '', profile_picture: '' }];
//     setJudges(newJudges);
//     setActiveStep(newJudges.length - 1);
//   };

//   const handleChange = (index, field, value) => {
//     const newJudges = [...judges];
//     newJudges[index][field] = value;
//     setJudges(newJudges);
//   };

//   const handlePhotoChange = (index, event) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         handleChange(index, 'profile_picture', reader.result);
//       }
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   };

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box sx={{ padding: isSmall ? '2rem 8%' : '2rem 30%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Box>
//         <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
//           Add Judges
//         </Typography>
//         <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
//         </Typography>
//         <Box sx={{ overflowX: 'auto', width: isSmall ? '80vw' : '40vw' }}>
//           <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
//             {judges.map((_, index) => (
//               <Step key={index}>
//                 <StepLabel>{`Judge ${index + 1}`}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Box>
//         <Box sx={{ mt: 3 }}>
//           <Box sx={{ mb: 3, p: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Avatar src={judges[activeStep]?.profile_picture} sx={{ width: 76, height: 76, mr: 2 }} />
//               <Box>
//                 <Button variant="outlined" component="label">
//                   Upload Your Photo
//                   <input type="file" hidden onChange={(e) => handlePhotoChange(activeStep, e)} />
//                 </Button>
//                 <Typography sx={{ fontSize: '0.8rem', color: 'grey', width: '80%' }}>
//                   Image format must be PNG/JPG and size less than 500 kb
//                 </Typography>
//               </Box>
//             </Box>
//             <label style={{ fontWeight: 600 }}>Judge Name</label>
//             <br />
//             <br />
//             <TextField
//               label="Judge Name"
//               variant="outlined"
//               fullWidth
//               value={judges[activeStep]?.judge_name || ''}
//               onChange={(e) => handleChange(activeStep, 'judge_name', e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <label style={{ fontWeight: 600 }}>Email</label>
//             <br />
//             <br />
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               value={judges[activeStep]?.email || ''}
//               onChange={(e) => handleChange(activeStep, 'email', e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Box gap={3} sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleAddNewJudge}
//                 sx={{ mr: 2, width: '100%', fontSize: isSmall ? '0.7rem' : '0.9rem', textTransform: 'none' }}
//               >
//                 + Add New Judge
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 sx={{ width: '100%', fontSize: isSmall ? '0.7rem' : '0.9rem', textTransform: 'none' }}
//               >
//                 {activeStep === judges.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddJudgeMain;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddJudgeMain = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [judges, setJudges] = useState([{ judge_name: '', email: '', phone: '', profile_picture: null }]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJudges = JSON.parse(localStorage.getItem('judges'));
    if (savedJudges) {
      setJudges(savedJudges);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('judges', JSON.stringify(judges));
  }, [judges]);

  const handleNext = () => {
    localStorage.setItem('judges', JSON.stringify(judges));
    if (activeStep === judges.length - 1) {
      navigate('/create-score-card', { state: { judges } });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleAddNewJudge = () => {
    const newJudges = [...judges, { judge_name: '', email: '', phone: '', profile_picture: null }];
    setJudges(newJudges);
    setActiveStep(newJudges.length - 1);
  };

  const handleChange = (index, field, value) => {
    const newJudges = [...judges];
    newJudges[index][field] = value;
    setJudges(newJudges);
  };

  const handlePhotoChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange(index, 'profile_picture', file);
    }
  };

  const handleRemoveJudge = (index) => {
    const newJudges = judges.filter((_, i) => i !== index);
    setJudges(newJudges);
    setActiveStep((prevActiveStep) => (prevActiveStep > 0 ? prevActiveStep - 1 : 0));
  };

  const isNextButtonDisabled = () => {
    const currentJudge = judges[activeStep];
    return !currentJudge.judge_name || !currentJudge.email;
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: isSmall ? '2rem 8%' : '2rem 30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Add Judges
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
        </Typography>
        <Box sx={{ overflowX: 'auto', width: isSmall ? '80vw' : '40vw' }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
            {judges.map((_, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                <StepLabel>
                  {`Judge ${index + 1}`}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveJudge(index);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ mt: 3 }}>
          {judges.map((judge, index) => (
            <Box key={index} sx={{ mb: 3, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={judge.profile_picture ? URL.createObjectURL(judge.profile_picture) : null}
                  sx={{ width: 76, height: 76, mr: 2 }}
                />
                <Box>
                  <Button variant="outlined" component="label">
                    Upload Your Photo
                    <input type="file" hidden onChange={(e) => handlePhotoChange(index, e)} accept="image/jpeg,image/png" />
                  </Button>
                  <Typography sx={{ fontSize: '0.8rem', color: 'grey', width: '80%' }}>
                    Image format must be PNG/JPG and size less than 500 kb
                  </Typography>
                </Box>
              </Box>
              <label style={{ fontWeight: 600 }}>Judge Name</label>
              <br />
              <br />
              <TextField
                label="Judge Name"
                variant="outlined"
                fullWidth
                value={judge.judge_name || ''}
                onChange={(e) => handleChange(index, 'judge_name', e.target.value)}
                sx={{ mb: 2 }}
              />
              <label style={{ fontWeight: 600 }}>Email</label>
              <br />
              <br />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={judge.email || ''}
                onChange={(e) => handleChange(index, 'email', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          ))}
          <Box gap={3} sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleAddNewJudge}
              sx={{ mr: 2, width: '100%', fontSize: isSmall ? '0.7rem' : '0.9rem', textTransform: 'none' }}
            >
              + Add New Judge
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ width: '100%', fontSize: isSmall ? '0.7rem' : '0.9rem', textTransform: 'none' }}
              disabled={isNextButtonDisabled()}
            >
              {activeStep === judges.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddJudgeMain;



