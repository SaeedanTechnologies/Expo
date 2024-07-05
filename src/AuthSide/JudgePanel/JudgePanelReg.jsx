// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFormJudegForm,
//   submitJudegFormData,
// } from "../../store/actions/addJudegsActions";
// import { useParams } from "react-router";
// import { useSnackbar } from "notistack";

// const JudgePanelReg = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState([]);
//   const [participantName, setParticipantName] = useState("");
//   const [formData, setFormData] = useState({});
//   const [judgeId, setJudgeId] = useState(null);
//   const [participantId, setParticipantId] = useState(null);
//   const [contestId, setContestId] = useState(null);
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const { enqueueSnackbar } = useSnackbar();
//   const judge_idd = useSelector((state) => state?.admin?.user?.id);
//   console.log(judge_idd, "dhadjkfsdkfsdjfh");
//   // useEffect(() => {
//   //   dispatch(fetchFormJudegForm(id))
//   //     .then(response => {
//   //       if (Array.isArray(response.data) && response.data.length > 0) {
//   //         const firstItem = response.data[0];
//   //         const fields = JSON.parse(firstItem.fields);

//   //         const mappedFields = fields.map(item => ({
//   //           id: item.name,
//   //           label: item.label,
//   //           name: item.name,
//   //           type: item.type,
//   //           required: item.required,
//   //         }));
//   //         setParticipantName(firstItem.current_participant_name); // Set the participant name

//   //         setFormFields(mappedFields);
//   //         setJudgeId(firstItem.judge_id);
//   //         setParticipantId(firstItem.current_participant_id);
//   //         setContestId(firstItem.contest_id);
//   //         localStorage.setItem("judge_response", JSON.stringify(firstItem));
//   //       } else {
//   //         console.error('Unexpected response structure:', response);
//   //       }
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching form fields:', error);
//   //     });
//   // }, [dispatch, id]);



//     useEffect(() => {
//     dispatch(fetchFormJudegForm(id))
//       .then(response => {
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const firstItem = response.data[0];
//           const fields = JSON.parse(firstItem.fields);

//           const mappedFields = fields.map(item => ({
//             id: item.name,
//             label: item.label,
//             name: item.name,
//             type: item.type,
//             required: item.required,
//           }));
//           setParticipantName(firstItem.current_participant_name); // Set the participant name

//           setFormFields(mappedFields);
//           setJudgeId(firstItem.judge_id);
//           setParticipantId(firstItem.current_participant_id);
//           setContestId(firstItem.contest_id);
//           localStorage.setItem("judge_response", JSON.stringify(firstItem));
//         } else {
//           console.error('Unexpected response structure:', response);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching form fields:', error);
//       });
//   }, [dispatch, id]);


//   useEffect(() => {
//     // Function to fetch form fields and participant info
//     const fetchFormFields = async () => {
//       try {
//         const response = await dispatch(fetchFormJudegForm(id));
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const firstItem = response.data[0];
//           const fields = JSON.parse(firstItem.fields);

//           const mappedFields = fields.map((item) => ({
//             id: item.name,
//             label: item.label,
//             name: item.name,
//             type: item.type,
//             required: item.required,
//           }));

//           setParticipantName(firstItem.current_participant_name);
//           setFormFields(mappedFields);
//           setJudgeId(firstItem.judge_id);
//           setParticipantId(firstItem.current_participant_id);
//           setContestId(firstItem.contest_id);
//           localStorage.setItem("judge_response", JSON.stringify(firstItem));
//         } else {
//           console.error("Unexpected response structure:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching form fields:", error);
//       }
//     };
//     fetchFormFields();
//     const intervalId = setInterval(fetchFormFields, 2000);
//     return () => clearInterval(intervalId);
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (participantId === null) {
//       setSubmitDisabled(true);
//     } else {
//       setSubmitDisabled(false);
//     }
//   }, [participantId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (!isNaN(value) && value >= 0 && value <= 10) {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       enqueueSnackbar("Please enter a number between 0 and 10 for the score.", {
//         variant: "error",
//       });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const scoresArray = formFields.map((field) => ({
//       field_name: field.name,
//       score: formData[field.name] || "",
//     }));
//     const dataToSubmit = {
//       scores: scoresArray,
//       judge_id: judge_idd,
//       participant_id: participantId,
//       contest_id: contestId,
//     };

//     dispatch(submitJudegFormData(dataToSubmit))
//       .then((response) => {
//         setSubmitDisabled(true);
//         setFormData({});
//         enqueueSnackbar("Score Assigned", { variant: "success" });
//       })
//       .catch((error) => {
//         if (error.response && error.response.data) {
//           enqueueSnackbar("Score is not Assigned ", { variant: "error" });
//         } else {
//           console.error("Unexpected error:", error);
//         }
//       });
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "80vh",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         padding: "1rem 8%",
//       }}
//     >
//       <Container>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: "12px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               color: "black",
//               fontFamily: "Roboto",
//               fontSize: { xs: "22px", md: "46px" },
//               fontWeight: 800,
//               lineHeight: "36px",
//               textAlign: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             {participantName ? participantName : "Participant Name"}
//           </Typography>
//           {/* <Typography
//             variant='h6'
//             sx={{
//               fontFamily: 'Roboto',
//               fontSize: '20px',
//               fontWeight: '400',
//               lineHeight: '28px',
//               textAlign: 'center',
//               marginBottom: '2rem',
//               color: '#949494',
//             }}
//           >
//             Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br/>
//             sit amet consectetur lorem ipsum dolor sit amet.
//           </Typography> */}

//           <Box sx={{ width: "100%", maxWidth: "500px" }}>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontFamily: "Roboto",
//                 fontSize: "1.4rem",
//                 fontWeight: 700,
//                 lineHeight: "28px",
//                 letterSpacing: "0.25px",
//                 textAlign: "left",
//                 color: "#000000",
//                 marginBottom: "1rem",
//                 textAlign: "center",
//               }}
//             >
//               Give Score
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               {formFields?.map((field) => (
//                 <Box key={field.id}>
//                   <InputLabel
//                     htmlFor={field.name}
//                     sx={{
//                       marginBottom: "0.5rem",
//                       fontFamily: "Roboto",
//                       fontSize: "1.1rem",
//                       fontWeight: 1000,
//                       lineHeight: "13px",
//                       letterSpacing: "0.25px",
//                       textAlign: "left",
//                       color: "#000000",
//                     }}
//                   >
//                     {field.label}
//                   </InputLabel>
//                   <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
//                     <TextField
//                       id={field.name}
//                       name={field.name}
//                       placeholder={field.label}
//                       value={formData[field.name] || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       type="number"
//                       variant="outlined"
//                       margin="normal"
//                       size="small"
//                       required={field.required}
//                       InputProps={{ style: { height: "60px" } }}
//                       sx={{ height: "60px" }}
//                     />
//                   </FormControl>
//                 </Box>
//               ))}
//               <Button
//                 disabled={submitDisabled}
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   marginTop: "1rem",
//                   marginBottom: "12px",
//                   padding: "12px",
//                   fontFamily: "Roboto",
//                 }}
//               >
//                 Submit
//               </Button>
//             </form>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default JudgePanelReg;





import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormJudegForm, submitJudegFormData } from '../../store/actions/addJudegsActions';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { FaEye } from 'react-icons/fa';

const JudgePanelReg = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [showParticipantId, setShowParticipantId] = useState("");

  const [formData, setFormData] = useState({});
  const [judgeId, setJudgeId] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [contestId, setContestId] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const judge_idd = useSelector(state => state?.admin?.user?.id);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await dispatch(fetchFormJudegForm(id));
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

          setParticipantName(firstItem.current_participant_name);
          setShowParticipantId(firstItem.current_participant_id);
          setFormFields(mappedFields);
          setJudgeId(firstItem.judge_id);
          setParticipantId(firstItem.current_participant_id);
          setContestId(firstItem.contest_id);
          localStorage.setItem("judge_response", JSON.stringify(firstItem));
        } else {
          console.log('Unexpected response structure:', response.response.data.message);
        }
      } catch (error) {
        setFetchError(error.response.data.message);
      }
    };

    fetchFormFields();
    const intervalId = setInterval(fetchFormFields, 2000);
    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  useEffect(() => {
    if (participantId === null) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [participantId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      enqueueSnackbar('Please enter a number between 0 and 10 for the score.', { variant: 'error' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const scoresArray = formFields.map(field => ({
      field_name: field.name,
      score: formData[field.name] || '',
    }));

    const dataToSubmit = {
      scores: scoresArray,
      judge_id: judge_idd,
      participant_id: participantId,
      contest_id: contestId
    };

    dispatch(submitJudegFormData(dataToSubmit))
      .then(response => {
        setLoading(false); // Stop loading
        setSubmitDisabled(true);
        setFormData({});
        enqueueSnackbar("Score Assigned ", { variant: "success" });
      })
      .catch(error => {
        setLoading(false); // Stop loading
        if (error.response && error.response.data) {

          enqueueSnackbar(error.response.data.error, { variant: "error" });
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
        minHeight: '80vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '1rem 8%'
      }}

    >


{fetchError ? (
      <Typography
        variant="h5"
        sx={{
          color: 'red',
          fontWeight:800,
          fontSize:'2rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {fetchError}
      </Typography>

    ) : (

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
            {participantName ? participantName : "Participant Name"}
          </Typography>

          <Typography
            variant='h4'
            sx={{
              color: 'black',
              fontFamily: 'Roboto',
              fontSize: { xs: '10px', md: '24px' },
              fontWeight: 800,
              lineHeight: '26px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {showParticipantId ? showParticipantId : 'Participant ID'}
          </Typography>




          <Box sx={{ width: '100%', maxWidth: '500px' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Roboto',
                fontSize: '1.4rem',
                fontWeight: 700,
                lineHeight: '28px',
                letterSpacing: '0.25px',
                textAlign: 'left',
                color: '#000000',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              Give Score <FaEye />
            </Typography>
            <form onSubmit={handleSubmit}>
              {formFields?.map(field => (
                <Box key={field.id}>
                  <InputLabel
                    htmlFor={field.name}
                    sx={{
                      marginBottom: '0.5rem',
                      fontFamily: 'Roboto',
                      fontSize: '1.1rem',
                      fontWeight: 1000,
                      lineHeight: '13px',
                      letterSpacing: '0.25px',
                      textAlign: 'left',
                      color: '#000000',
                    }}
                  >
                    {field.label}
                  </InputLabel>
                  <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      fullWidth
                      type="number"
                      variant='outlined'
                      margin='normal'
                      size='small'
                      required={field.required}
                      InputProps={{ style: { height: '60px' } }}
                      sx={{ height: '60px' }}
                    />
                  </FormControl>
                </Box>
              ))}
              <Button
                disabled={submitDisabled || loading} // Disable when loading
                type='submit'
                variant='contained'
                fullWidth
                sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', position: 'relative' }}
              >
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />} {/* Loader */}
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Box>
        </Box>
      </Container>

    )}
    </Box>
  );
};

export default JudgePanelReg;


// import React, { useState, useEffect } from 'react';
// import { Box, Container, Typography, TextField, Button, FormControl, InputLabel, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFormJudegForm, submitJudegFormData } from '../../store/actions/addJudegsActions';
// import { useParams } from 'react-router';
// import { useSnackbar } from 'notistack';
// import { FaEye } from 'react-icons/fa';

// const JudgePanelReg = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState([]);
//   const [participantName, setParticipantName] = useState("");
//   const [showParticipantId, setShowParticipantId] = useState("");
//   const [formData, setFormData] = useState({});
//   const [judgeId, setJudgeId] = useState(null);
//   const [participantId, setParticipantId] = useState(null);
//   const [contestId, setContestId] = useState(null);
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();
//   const judge_idd = useSelector(state => state?.admin?.user?.id);
//   const [fetchError, setFetchError] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogData, setDialogData] = useState([]);

//   useEffect(() => {
//     const fetchFormFields = async () => {
//       try {
//         const response = await dispatch(fetchFormJudegForm(id));
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const firstItem = response.data[0];
//           const fields = JSON.parse(firstItem.fields);

//           const mappedFields = fields.map(item => ({
//             id: item.name,
//             label: item.label,
//             name: item.name,
//             type: item.type,
//             required: item.required,
//             is_important: item.is_important // Assuming the API includes is_important field
//           }));

//           setParticipantName(firstItem.current_participant_name);
//           setShowParticipantId(firstItem.current_participant_id);
//           setFormFields(mappedFields);
//           setJudgeId(firstItem.judge_id);
//           setParticipantId(firstItem.current_participant_id);
//           setContestId(firstItem.contest_id);
//           localStorage.setItem("judge_response", JSON.stringify(firstItem));
//         } else {
//           console.log('Unexpected response structure:', response.response.data.message);
//         }
//       } catch (error) {
//         setFetchError(error.response.data.message);
//       }
//     };

//     fetchFormFields();
//     const intervalId = setInterval(fetchFormFields, 2000);
//     return () => clearInterval(intervalId);
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (participantId === null) {
//       setSubmitDisabled(true);
//     } else {
//       setSubmitDisabled(false);
//     }
//   }, [participantId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (!isNaN(value) && value >= 0 && value <= 10) {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       enqueueSnackbar('Please enter a number between 0 and 10 for the score.', { variant: 'error' });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true); // Start loading

//     const scoresArray = formFields.map(field => ({
//       field_name: field.name,
//       score: formData[field.name] || '',
//     }));

//     const dataToSubmit = {
//       scores: scoresArray,
//       judge_id: judge_idd,
//       participant_id: participantId,
//       contest_id: contestId
//     };

//     dispatch(submitJudegFormData(dataToSubmit))
//       .then(response => {
//         setLoading(false); // Stop loading
//         setSubmitDisabled(true);
//         setFormData({});
//         enqueueSnackbar("Score Assigned ", { variant: "success" });
//       })
//       .catch(error => {
//         setLoading(false); // Stop loading
//         if (error.response && error.response.data) {
//           enqueueSnackbar(error.response.data.error, { variant: "error" });
//         } else {
//           console.error('Unexpected error:', error);
//         }
//       });
//   };

//   const handleEyeClick = () => {
//     const dataToShow = formFields.filter(field => !field.is_important);
//     setDialogData(dataToShow);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '80vh',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         padding: '1rem 8%'
//       }}
//     >

//       {fetchError ? (
//         <Typography
//           variant="h5"
//           sx={{
//             color: 'red',
//             fontWeight:800,
//             fontSize:'2rem',
//             textAlign: 'center',
//             marginBottom: '1rem',
//           }}
//         >
//           {fetchError}
//         </Typography>
//       ) : (
//         <Container>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               marginTop: '12px',
//             }}
//           >
//             <Typography
//               variant='h4'
//               sx={{
//                 color: 'black',
//                 fontFamily: 'Roboto',
//                 fontSize: { xs: '22px', md: '46px' },
//                 fontWeight: 800,
//                 lineHeight: '36px',
//                 textAlign: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               {participantName ? participantName : "Participant Name"}
//             </Typography>

//             <Typography
//               variant='h4'
//               sx={{
//                 color: 'black',
//                 fontFamily: 'Roboto',
//                 fontSize: { xs: '10px', md: '24px' },
//                 fontWeight: 800,
//                 lineHeight: '26px',
//                 textAlign: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               {showParticipantId ? showParticipantId : 'Participant ID'}
//             </Typography>

//             <Box sx={{ width: '100%', maxWidth: '500px' }}>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontFamily: 'Roboto',
//                   fontSize: '1.4rem',
//                   fontWeight: 700,
//                   lineHeight: '28px',
//                   letterSpacing: '0.25px',
//                   textAlign: 'left',
//                   color: '#000000',
//                   marginBottom: '1rem',
//                   textAlign: 'center'
//                 }}
//               >
//                 Give Score
//                 <IconButton onClick={handleEyeClick}>
//                   <FaEye />
//                 </IconButton>
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 {formFields?.map(field => (
//                   <Box key={field.id}>
//                     <InputLabel
//                       htmlFor={field.name}
//                       sx={{
//                         marginBottom: '0.5rem',
//                         fontFamily: 'Roboto',
//                         fontSize: '1.1rem',
//                         fontWeight: 1000,
//                         lineHeight: '13px',
//                         letterSpacing: '0.25px',
//                         textAlign: 'left',
//                         color: '#000000',
//                       }}
//                     >
//                       {field.label}
//                     </InputLabel>
//                     <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
//                       <TextField
//                         id={field.name}
//                         name={field.name}
//                         placeholder={field.label}
//                         value={formData[field.name] || ''}
//                         onChange={handleChange}
//                         fullWidth
//                         type="number"
//                         variant='outlined'
//                         margin='normal'
//                         size='small'
//                         required={field.required}
//                         InputProps={{ style: { height: '60px' } }}
//                         sx={{ height: '60px' }}
//                       />
//                     </FormControl>
//                   </Box>
//                 ))}
//                 <Button
//                   disabled={submitDisabled || loading} // Disable when loading
//                   type='submit'
//                   variant='contained'
//                   fullWidth
//                   sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', position: 'relative' }}
//                 >
//                   {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />} {/* Loader */}
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </Button>
//               </form>
//             </Box>
//           </Box>
//         </Container>
//       )}

//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Field Data</DialogTitle>
//         <DialogContent>
//           {dialogData.map((field, index) => (
//             <Box key={index} sx={{ marginBottom: '1rem' }}>
//               <Typography variant="body1" sx={{ fontWeight: 600 }}>{field.label}:</Typography>
//               <Typography variant="body2">{formData[field.name] || 'N/A'}</Typography>
//             </Box>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default JudgePanelReg;








































































// import React, { useState, useEffect } from 'react';
// import { Box, Container, Typography, TextField, Button, FormControl, InputLabel, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFormJudegForm, submitJudegFormData } from '../../store/actions/addJudegsActions';
// import { useParams } from 'react-router';
// import { useSnackbar } from 'notistack';
// import { FaEye } from 'react-icons/fa';

// const JudgePanelReg = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState([]);
//   const [participantName, setParticipantName] = useState("");
//   const [showParticipantId, setShowParticipantId] = useState("");
//   const [formData, setFormData] = useState({});
//   const [judgeId, setJudgeId] = useState(null);
//   const [participantId, setParticipantId] = useState(null);
//   const [contestId, setContestId] = useState(null);
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();
//   const judge_idd = useSelector(state => state?.admin?.user?.id);
//   const [fetchError, setFetchError] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogData, setDialogData] = useState([]);
//   const [fieldsValues, setFieldsValues] = useState({});

//   useEffect(() => {
//     const fetchFormFields = async () => {
//       try {
//         const response = await dispatch(fetchFormJudegForm(id));
//         console.log(response.data[0], 'dddhh')
//         if (response.data && response.data.score_cards && response.data.form_fields) {
//           const firstItem = response.data.score_cards;
//           const fields = JSON.parse(firstItem.fields);
// console.log(fields, 'gggggggggg')
//           const mappedFields = fields.map(item => ({
//             id: item.name,
//             label: item.label,
//             name: item.name,
//             type: item.type,
//             required: item.required,
//             is_important: item.is_important
//           }));
//           setParticipantName(firstItem.current_participant_name);
//           setShowParticipantId(firstItem.current_participant_id);
//           setFormFields(mappedFields);
//           setJudgeId(firstItem.judge_id);
//           setParticipantId(firstItem.current_participant_id);
//           setContestId(firstItem.contest_id);
//           setFieldsValues(JSON.parse(response.data.participant.fields_values || "{}"));
//           localStorage.setItem("judge_response", JSON.stringify(firstItem));
//         } else {
//           console.log('Unexpected response structure:', response.response.data.message);
//         }
//       } catch (error) {
//         // setFetchError(error.response.data.message);
//         setFetchError(error?.response?.data?.message);

//       }
//     };

//     fetchFormFields();
//     const intervalId = setInterval(fetchFormFields, 2000);
//     return () => clearInterval(intervalId);
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (participantId === null) {
//       setSubmitDisabled(true);
//     } else {
//       setSubmitDisabled(false);
//     }
//   }, [participantId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (!isNaN(value) && value >= 0 && value <= 10) {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       enqueueSnackbar('Please enter a number between 0 and 10 for the score.', { variant: 'error' });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true); // Start loading

//     const scoresArray = formFields.map(field => ({
//       field_name: field.name,
//       score: formData[field.name] || '',
//     }));

//     const dataToSubmit = {
//       scores: scoresArray,
//       judge_id: judge_idd,
//       participant_id: participantId,
//       contest_id: contestId
//     };

//     dispatch(submitJudegFormData(dataToSubmit))
//       .then(response => {
//         setLoading(false); // Stop loading
//         setSubmitDisabled(true);
//         setFormData({});
//         enqueueSnackbar("Score Assigned ", { variant: "success" });
//       })
//       .catch(error => {
//         setLoading(false); // Stop loading
//         if (error.response && error.response.data) {
//           enqueueSnackbar(error.response.data.error, { variant: "error" });
//         } else {
//           console.error('Unexpected error:', error);
//         }
//       });
//   };

//   const handleEyeClick = () => {
//     const dataToShow = formFields.filter(field => !field.is_important);
//     alert(dataToShow)
//     setDialogData(dataToShow);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '80vh',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         padding: '1rem 8%'
//       }}
//     >

//       {fetchError ? (
//         <Typography
//           variant="h5"
//           sx={{
//             color: 'red',
//             fontWeight: 800,
//             fontSize: '2rem',
//             textAlign: 'center',
//             marginBottom: '1rem',
//           }}
//         >
//           {fetchError}
//         </Typography>
//       ) : (
//         <Container>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               marginTop: '12px',
//             }}
//           >
//             <Typography
//               variant='h4'
//               sx={{
//                 color: 'black',
//                 fontFamily: 'Roboto',
//                 fontSize: { xs: '22px', md: '46px' },
//                 fontWeight: 800,
//                 lineHeight: '36px',
//                 textAlign: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               {participantName ? participantName : "Participant Name"}
//             </Typography>

//             <Typography
//               variant='h4'
//               sx={{
//                 color: 'black',
//                 fontFamily: 'Roboto',
//                 fontSize: { xs: '10px', md: '24px' },
//                 fontWeight: 800,
//                 lineHeight: '26px',
//                 textAlign: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               {showParticipantId ? showParticipantId : 'Participant ID'}
//             </Typography>

//             <Box sx={{ width: '100%', maxWidth: '500px' }}>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontFamily: 'Roboto',
//                   fontSize: '1.4rem',
//                   fontWeight: 700,
//                   lineHeight: '28px',
//                   letterSpacing: '0.25px',
//                   textAlign: 'left',
//                   color: '#000000',
//                   marginBottom: '1rem',
//                   textAlign: 'center'
//                 }}
//               >
//                 Give Score
//                 <IconButton onClick={handleEyeClick}>
//                   <FaEye />
//                 </IconButton>
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 {formFields?.map(field => (
//                   <Box key={field.id}>
//                     <InputLabel
//                       htmlFor={field.name}
//                       sx={{
//                         marginBottom: '0.5rem',
//                         fontFamily: 'Roboto',
//                         fontSize: '1.1rem',
//                         fontWeight: 1000,
//                         lineHeight: '13px',
//                         letterSpacing: '0.25px',
//                         textAlign: 'left',
//                         color: '#000000',
//                       }}
//                     >
//                       {field.label}
//                     </InputLabel>
//                     <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
//                       <TextField
//                         id={field.name}
//                         name={field.name}
//                         placeholder={field.label}
//                         value={formData[field.name] || ''}
//                         onChange={handleChange}
//                         fullWidth
//                         type="number"
//                         variant='outlined'
//                         margin='normal'
//                         size='small'
//                         required={field.required}
//                         InputProps={{ style: { height: '60px' } }}
//                         sx={{ height: '60px' }}
//                       />
//                     </FormControl>
//                     {field.is_important === 0 && (
//                       <Typography variant="body2">
//                         {fieldsValues[field.name] || 'N/A'}
//                       </Typography>
//                     )}
//                   </Box>
//                 ))}
//                 <Button
//                   disabled={submitDisabled || loading} // Disable when loading
//                   type='submit'
//                   variant='contained'
//                   fullWidth
//                   sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', position: 'relative' }}
//                 >
//                   {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />} {/* Loader */}
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </Button>
//               </form>
//             </Box>
//           </Box>
//         </Container>
//       )}

//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Field Data</DialogTitle>
//         <DialogContent>
//           {dialogData.map((field, index) => (
//             <Box key={index} sx={{ marginBottom: '1rem' }}>
//             {console.log(field, "field")}
//               <Typography variant="body1" sx={{ fontWeight: 600 }}>{field.label}:</Typography>
//               <Typography variant="body2">{formData[field.name] || 'N/A'}</Typography>
//             </Box>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default JudgePanelReg;
