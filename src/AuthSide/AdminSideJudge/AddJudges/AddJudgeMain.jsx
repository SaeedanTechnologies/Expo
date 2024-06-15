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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Judge 1', 'Judge 2', 'Judge 3', 'Judge 4'];

const AddJudgeMain = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [judges, setJudges] = useState([{ name: '', email: '', photo: '' }]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJudges = JSON.parse(localStorage.getItem('judges'));
    if (savedJudges) {
      setJudges(savedJudges);
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem('judges', JSON.stringify(judges));
    if (activeStep === steps.length - 1) {
      navigate('/create-score-card');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleAddNewJudge = () => {
    const newJudges = [...judges];
    // Ensure the current step's data is saved before proceeding
    newJudges[activeStep] = {
      name: judges[activeStep]?.name || '',
      email: judges[activeStep]?.email || '',
      photo: judges[activeStep]?.photo || ''
    };

    // Add a new judge at the next step if it doesn't already exist
    if (!newJudges[activeStep + 1]) {
      newJudges[activeStep + 1] = { name: '', email: '', photo: '' };
    }

    setJudges(newJudges);
    localStorage.setItem('judges', JSON.stringify(newJudges)); // Save updated state

    // Move to the next step
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };


  const handleChange = (index, field, value) => {
    const newJudges = [...judges];
    newJudges[index][field] = value;
    setJudges(newJudges);
  };

  const handlePhotoChange = (index, event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        handleChange(index, 'photo', reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <Box sx={{ padding: '2rem 30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{textAlign:'center'}}>
          Add Judges
        </Typography>
        <Typography variant="body1" gutterBottom sx={{textAlign:'center'}}>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 3, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:2 }}>
              <Avatar src={judges[activeStep]?.photo} sx={{ width: 76, height: 76, mr: 2 }} />
              <Box>
              <Button variant="outlined" component="label">
                Upload Your Photo
                <input type="file" hidden onChange={(e) => handlePhotoChange(activeStep, e)} />
              </Button>
              <Typography sx={{fontSize:'0.8rem', color:'grey', width:'80%'}}>Image format must be PNG/JPGand size
              less then 500 kb </Typography>
              </Box>
            </Box>
            <label style={{fontWeight:600,}}>Judge Name</label>
            <br/>
            <br/>

            <TextField
              label="Judge Name"
              variant="outlined"
              fullWidth
              value={judges[activeStep]?.name || ''}
              onChange={(e) => handleChange(activeStep, 'name', e.target.value)}
              sx={{ mb: 2 }}
            />
                        <label style={{fontWeight:600,}}>Email</label>
            <br/>
            <br/>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={judges[activeStep]?.email || ''}
              onChange={(e) => handleChange(activeStep, 'email', e.target.value)}
            />
<Box gap={3} sx={{display:'flex', alignItems:'center', mt:3}}>
         <Button
  variant="outlined"
  onClick={handleAddNewJudge}

  sx={{ mr: 2, width:'100%' }}
  disabled={activeStep === steps.length - 1} // Disable when all steps are completed
>
  + Add New Judge
</Button>
<Button
  variant="contained"
  color="primary"
  onClick={handleNext}
sx={{width:'100%'}}
>
  {activeStep === steps.length - 1 ? 'Next' : 'Next'}
</Button>
         </Box>


          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default AddJudgeMain;
