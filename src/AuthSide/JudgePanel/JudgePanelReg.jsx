import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchFormJudegForm, submitJudegFormData } from '../../store/actions/addJudegsActions';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const JudgePanelReg = () => {
  const {id} = useParams()

  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState([]);
  const [particeipentName, setParticeipentName] = useState([]);
  const PArticepentName=particeipentName.map(name=>name.current_participant_name)
  console.log(PArticepentName,"response")
  const [formData, setFormData] = useState({});
  const [judgeId, setJudgeId] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [contestId, setContestId] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  console.log(formData,"FormData");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchFormJudegForm(id))
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstItem = response.data[0];
          const fields = JSON.parse(firstItem.fields);
         
          const mappedFields = fields.map(item => ({
            id: item.name,
            label: item.label,
            name: item.name,
            type: item.type,
            required: item.required,
          }));
          setParticeipentName(response.data)
          
          setFormFields(mappedFields);

          setJudgeId(firstItem.judge_id);
          setParticipantId(firstItem.current_participant_id);
          setContestId(firstItem.contest_id);

          localStorage.setItem("judge_response", JSON.stringify(firstItem));
        } else {
          console.error('Unexpected response structure:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching form fields:', error);
      });
  }, [dispatch]);

  useEffect(() => {

    if (participantId === null) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [participantId]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'linework') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       linework: value,
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (!isNaN(value) && value >= 0 && value <= 10) {
      if (name === 'linework') {
        setFormData(prevState => ({
          ...prevState,
          linework: value,
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {

      enqueueSnackbar('Please enter a number between 0 and 10 for the score.', {variant:'error'});
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();


    const scoresArray = formFields.map(field => ({
      field_name: field.name,
      score: formData[field.name] || '',
    }))

    const dataToSubmit = {
      scores: scoresArray,
      judge_id: judgeId,
      participant_id: participantId,
      contest_id: contestId
    };

    console.log('Form submitted:', dataToSubmit);

    dispatch(submitJudegFormData(dataToSubmit))
      .then(response => {
        // Handle success response
        console.log('Submission success:', response);
      setSubmitDisabled(true);
      setFormData({})
      enqueueSnackbar("Score Assigned", { variant: "success" });


      })
      .catch(error => {
        if (error.response && error.response.data) {
          const { payload } = error.response.data;

          console.log(error, 'errorrrr')
          // enqueueSnackbar(error.response.data.error, { variant: "error" });
          enqueueSnackbar('Score is not Assigned ', { variant: "error" });


        } else {
          console.error('Unexpected error:', error);
        }
      });
  };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '12px',
          }}
        >
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              fontFamily: 'Roboto',
              fontSize: { xs: '22px', md: '46px' },
              fontWeight: 800,
              lineHeight: '36px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
          {PArticepentName}

          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '2rem',
              color: '#949494',
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
            sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>

          <Box sx={{ width: '100%', maxWidth: '500px' }}>
          <Typography
          variant="h5"
          sx={{
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: 700,
            lineHeight: '28px',
            letterSpacing: '0.25px',
            textAlign: 'left',
            color: '#000000',
            marginBottom: '1rem',
          }}
        >
          Give Score
        </Typography>
            <form onSubmit={handleSubmit}>
              {formFields?.map(field => (
                <Box key={field.id}>
                  <InputLabel
                    htmlFor={field.name}
                    sx={{
                      marginBottom: '0.5rem',
                      fontFamily: 'Roboto',
                      fontSize: '22px',
                      fontWeight: 1000,
                      lineHeight: '28px',
                      letterSpacing: '0.25px',
                      textAlign: 'left',
                      color: '#000000',
                    }}
                  >
                    {field.label}

                    {/* {field.current_participant_id} */}


                  </InputLabel>
                  <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      // type={field.type}
                      placeholder={field.label}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      fullWidth
                      type="number"
                      variant='outlined'
                      margin='normal'
                      required={field.required}
                      InputProps={{ style: { height: '60px' } }}
                      sx={{ height: '60px' }}
                    />
                  </FormControl>


                </Box>
              ))}

              <Button
              disabled={submitDisabled}
                type='submit'
                variant='contained'
                fullWidth
                sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JudgePanelReg;


