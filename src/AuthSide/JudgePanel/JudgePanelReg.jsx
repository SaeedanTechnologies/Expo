// import React from 'react';
// import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';

// const JudgePanelReg = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//   };

//   return (
//     <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
    
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat'
//     }}
//   >
//     <Container >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           marginTop: '12px',
//         }}
//       >
//         <Typography
//           variant='h4'
//           sx={{
//             color: 'black',
//             fontFamily: 'Roboto',
//             fontSize: { xs: '22px', md: '46px' },
//             fontWeight: 800,
//             lineHeight: '36px',
//             textAlign: 'center',
//             marginBottom: '1rem',
//           }}
//         >
//           HAMZA YASIN
//         </Typography>
//         <Typography
//           variant='h6'
//           sx={{
//             fontFamily: 'Roboto',
//             fontSize: '20px',
//             fontWeight: '400',
//             lineHeight: '28px',
//             textAlign: 'center',
//             marginBottom: '2rem',
//             color: '#949494',
//           }}
//         >
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
//           sit amet consectetur lorem ipsum dolor sit amet.
//         </Typography>

//         <Box sx={{ width: '100%', maxWidth: '500px' }}>
//           <form onSubmit={handleSubmit}>
//           <Box>
//           <InputLabel
//           htmlFor='contextname'
//           sx={{
//             marginBottom: '0rem',
//             fontFamily: 'Roboto',
//             fontSize: '22px',
//             fontWeight: 1000,
//             lineHeight: '28px',
//             letterSpacing: '0.25px',
//             textAlign: 'left',
//             color: '#000000',
//           }}
//         >
//           Context Name
//         </InputLabel>
//         <Typography sx={{color:"#D8D8D8"}}>Event Exhibition</Typography>
//         <FormControl fullWidth >
//           <TextField
//             id='contextname'
//             fullWidth
//             variant='outlined'
//             margin='normal'
//             required
//             InputProps={{
            
//               sx: {
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderBottom: '1px solid #D1D1D1', 
//                   borderLeft: 'none', 
//                   borderRight: 'none', 
//                   borderTop: 'none', 
//                   padding:'0px'
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderBottom: '2px solid #D1D1D1', 
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderBottom: '2px solid #D1D1D1', 
//                 },
//               },
//             }}
//             sx={{
            
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   border: 'none', 
//                 },
//               },
//             }}
//           />
//         </FormControl>
        
       
//           </Box>
        //   <Typography
        //   variant="h5"
        //   sx={{
        //     fontFamily: 'Roboto',
        //     fontSize: '34px',
        //     fontWeight: 700,
        //     lineHeight: '28px',
        //     letterSpacing: '0.25px',
        //     textAlign: 'left',
        //     color: '#000000',
        //     marginBottom: '1rem',
        //   }}
        // >
        //   Give Score
        // </Typography>
        //   <InputLabel
        //   htmlFor='linework'
        //   sx={{
        //     marginBottom: '0.5rem',
        //     fontFamily: 'Roboto',
        //     fontSize: '22px',
        //     fontWeight: 1000,
        //     lineHeight: '28px',
        //     letterSpacing: '0.25px',
        //     textAlign: 'left',
        //     color: '#000000',
        //   }}
        // >
        //   LineWork
        // </InputLabel>
        // <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
        //   <TextField
        //     id='linework'
        //     fullWidth
        //     variant='outlined'
        //     margin='normal'
        //     required
        //     InputProps={{ style: { height: '60px' } }} // Apply height to the input element
        //     sx={{ height: '60px' }} 
        //   />
        // </FormControl>
//           <InputLabel
//           htmlFor='shading'
//           sx={{
//             marginBottom: '0.5rem',
//             fontFamily: 'Roboto',
//             fontSize: '22px',
//             fontWeight: 1000,
//             lineHeight: '28px',
//             letterSpacing: '0.25px',
//             textAlign: 'left',
//             color: '#000000',
//           }}
//         >
//           Shading
//         </InputLabel>
//         <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
//           <TextField
//             id='shading'
//             fullWidth
//             variant='outlined'
//             margin='normal'
//             placeholder='e.g 0-10'
//             required
//             InputProps={{ style: { height: '60px' } }} // Apply height to the input element
//             sx={{ height: '60px' }} 
//           />
//         </FormControl>
//             <InputLabel
//               htmlFor='design'
//               sx={{
//                 marginBottom: '0.5rem',
//                 fontFamily: 'Roboto',
//                 fontSize: '22px',
//                 fontWeight: 1000,
//                 lineHeight: '28px',
//                 letterSpacing: '0.25px',
//                 textAlign: 'left',
//                 color: '#000000',
//               }}
//             >
//               Design
//             </InputLabel>
//             <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
//               <TextField
//                 id='design'
//                 fullWidth
//                 variant='outlined'
//                 margin='normal'
//                 required
//                 InputProps={{ style: { height: '60px' } }} // Apply height to the input element
//                 sx={{ height: '60px' }} 
//               />
//             </FormControl>

//             <Button
//               type='submit'
//               variant='contained'
//               fullWidth
//               sx={{ marginTop: '1rem', marginBottom:"12px" , padding:'12px',  fontFamily: 'Roboto',}}
//             >
//               Submit
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </Container>
//     </Box>
//   );
// };

// export default JudgePanelReg;


// import React, { useState, useEffect } from 'react';
// import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { fetchFormJudegForm } from '../../store/actions/addJudegsActions';

// const JudgePanelReg = () => {
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState([]);
//   const [formData, setFormData] = useState({});
// console.log(formFields,"KLKKKKKKKl")
//   useEffect(() => {
//     dispatch(fetchFormJudegForm())
//       .then(response => {
//         console.log(response.data); // Check the structure of the response here
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           // Assuming response is an array of objects
//           const fields = response.data.map(item => ({
//             id: item.id,
//             label: `Label for ${item.id}`, // Customize as needed
//             name: `field_${item.id}`,
//             type: 'text', // Customize as needed
//             required: true // Customize as needed
//           }));
//           setFormFields(fields);
//         } else {
//           console.error('Unexpected response structure:', response);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching form fields:', error);
//       });
//   }, [dispatch]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <Container>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '12px',
//           }}
//         >
//           <Typography
//             variant='h4'
//             sx={{
//               color: 'black',
//               fontFamily: 'Roboto',
//               fontSize: { xs: '22px', md: '46px' },
//               fontWeight: 800,
//               lineHeight: '36px',
//               textAlign: 'center',
//               marginBottom: '1rem',
//             }}
//           >
//             HAMZA YASIN
//           </Typography>
//           <Typography
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
//             Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
//             sit amet consectetur lorem ipsum dolor sit amet.
//           </Typography>

//           <Box sx={{ width: '100%', maxWidth: '500px' }}>
//             <form onSubmit={handleSubmit}>
//               {formFields?.map(field => (
//                 <Box key={field.id}>
//                   <InputLabel
//                     htmlFor={field.name}
//                     sx={{
//                       marginBottom: '0.5rem',
//                       fontFamily: 'Roboto',
//                       fontSize: '22px',
//                       fontWeight: 1000,
//                       lineHeight: '28px',
//                       letterSpacing: '0.25px',
//                       textAlign: 'left',
//                       color: '#000000',
//                     }}
//                   >
//                     {field.label}
//                   </InputLabel>
//                   <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
//                     <TextField
//                       id={field.name}
//                       name={field.name}
//                       type={field.type}
//                       placeholder={field.label}
//                       value={formData[field.name] || ''}
//                       onChange={handleChange}
//                       fullWidth
//                       variant='outlined'
//                       margin='normal'
//                       required={field.required}
//                       InputProps={{ style: { height: '60px' } }}
//                       sx={{ height: '60px' }}
//                     />
//                   </FormControl>
//                   <Typography
//                   variant="h5"
//                   sx={{
//                     fontFamily: 'Roboto',
//                     fontSize: '34px',
//                     fontWeight: 700,
//                     lineHeight: '28px',
//                     letterSpacing: '0.25px',
//                     textAlign: 'left',
//                     color: '#000000',
//                     marginBottom: '1rem',
//                   }}
//                 >
//                   Give Score
//                 </Typography>
//                   <InputLabel
//                   htmlFor='linework'
//                   sx={{
//                     marginBottom: '0.5rem',
//                     fontFamily: 'Roboto',
//                     fontSize: '22px',
//                     fontWeight: 1000,
//                     lineHeight: '28px',
//                     letterSpacing: '0.25px',
//                     textAlign: 'left',
//                     color: '#000000',
//                   }}
//                 >
//                   LineWork
//                 </InputLabel>
//                 <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
//                   <TextField
//                     id='linework'
//                     fullWidth
//                     variant='outlined'
//                     margin='normal'
//                     required
//                     InputProps={{ style: { height: '60px' } }} // Apply height to the input element
//                     sx={{ height: '60px' }} 
//                   />
//                 </FormControl>
//                 </Box>
//               ))}
//               <Button
//                 type='submit'
//                 variant='contained'
//                 fullWidth
//                 sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', }}
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


// import React, { useState, useEffect } from 'react';
// import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { fetchFormJudegForm , submitJudegFormData} from '../../store/actions/addJudegsActions';

// const JudgePanelReg = () => {
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [judgeId, setJudgeId] = useState(null);
//   const [participantId, setParticipantId] = useState(null);
//   const [contestId, setContestId] = useState(null);
//  console.log(judgeId,"judgeId")
//   useEffect(() => {
//     dispatch(fetchFormJudegForm())
//       .then(response => {
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const fields = response.data.map(item => ({
//             id: item.id,
//             label: `Label for ${item.id}`,
//             name: `field_${item.id}`,
//             type: 'text',
//             required: true
//           }));
//           setFormFields(fields);
          
//          console.log(response?.data,"irfan")
//           setJudgeId(response.data.judge_id);
//           setParticipantId(response.data.participant_id);
//           setContestId(response.data.contest_id);

//           localStorage.setItem("judge_response", JSON.stringify(response.data));
//         } else {
//           console.error('Unexpected response structure:', response);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching form fields:', error);
//       });
//   }, [dispatch]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const dataToSubmit = {
//       ...formData,
//       judge_id: judgeId,
//       participant_id: participantId,
//       contest_id: contestId
//     };
//     console.log('Form submitted:', dataToSubmit);
//     dispatch(submitJudegFormData(dataToSubmit))
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <Container>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '12px',
//           }}
//         >
//           <Typography
//             variant='h4'
//             sx={{
//               color: 'black',
//               fontFamily: 'Roboto',
//               fontSize: { xs: '22px', md: '46px' },
//               fontWeight: 800,
//               lineHeight: '36px',
//               textAlign: 'center',
//               marginBottom: '1rem',
//             }}
//           >
//             HAMZA YASIN
//           </Typography>
//           <Typography
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
//             Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
//             sit amet consectetur lorem ipsum dolor sit amet.
//           </Typography>

//           <Box sx={{ width: '100%', maxWidth: '500px' }}>
//             <form onSubmit={handleSubmit}>
//               {formFields?.map(field => (
//                 <Box key={field.id}>
//                   <InputLabel
//                     htmlFor={field.name}
//                     sx={{
//                       marginBottom: '0.5rem',
//                       fontFamily: 'Roboto',
//                       fontSize: '22px',
//                       fontWeight: 1000,
//                       lineHeight: '28px',
//                       letterSpacing: '0.25px',
//                       textAlign: 'left',
//                       color: '#000000',
//                     }}
//                   >
//                     {field.label}
//                     {console.log(field.label,"field.label")}
//                   </InputLabel>
//                   <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
//                     <TextField
//                       id={field.name}
//                       name={field.name}
//                       type={field.type}
//                       placeholder={field.label}
//                       value={formData[field.name] || ''}
//                       onChange={handleChange}
//                       fullWidth
//                       variant='outlined'
//                       margin='normal'
//                       required={field.required}
//                       InputProps={{ style: { height: '60px' } }}
//                       sx={{ height: '60px' }}
//                     />
//                   </FormControl>
//                 </Box>
//               ))}
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontFamily: 'Roboto',
//                   fontSize: '34px',
//                   fontWeight: 700,
//                   lineHeight: '28px',
//                   letterSpacing: '0.25px',
//                   textAlign: 'left',
//                   color: '#000000',
//                   marginBottom: '1rem',
//                 }}
//               >
//                 Give Score
//               </Typography>
//               <InputLabel
//                 htmlFor='linework'
//                 sx={{
//                   marginBottom: '0.5rem',
//                   fontFamily: 'Roboto',
//                   fontSize: '22px',
//                   fontWeight: 1000,
//                   lineHeight: '28px',
//                   letterSpacing: '0.25px',
//                   textAlign: 'left',
//                   color: '#000000',
//                 }}
//               >
             
//                 LineWork
//               </InputLabel>
//               <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
//                 <TextField
//                   id='linework'
//                   name='linework'
//                   type='text'
//                   placeholder='Enter linework score'
//                   value={formData.linework || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant='outlined'
//                   margin='normal'
//                   required
//                   InputProps={{ style: { height: '60px' } }} 
//                   sx={{ height: '60px' }} 
//                 />
//               </FormControl>
//               <Button
//                 type='submit'
//                 variant='contained'
//                 fullWidth
//                 sx={{ marginTop: '1rem', marginBottom: "12px", padding: '12px', fontFamily: 'Roboto', }}
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
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchFormJudegForm, submitJudegFormData } from '../../store/actions/addJudegsActions';

const JudgePanelReg = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [judgeId, setJudgeId] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [contestId, setContestId] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    dispatch(fetchFormJudegForm())
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstItem = response.data[0];
          const fields = JSON.parse(firstItem.fields); // Assuming fields is a JSON string

          const mappedFields = fields.map(item => ({
            id: item.name, // Using name as id, adjust as needed
            label: item.label,
            name: item.name,
            type: item.type,
            required: item.required,
          }));
          
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
    // Check if participantId is null to disable submit button
    if (participantId === null) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [participantId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create an array of scores
    const scoresArray = formFields.map(field => ({
      field_name: field.name,
      score: formData[field.name] || '', // Assuming you store score under field name
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
      })
      .catch(error => {
        // Handle error response
        if (error.response && error.response.data) {
          const { payload } = error.response.data;
          console.error('Submission error:', payload);
          // Handle payload structure like {"scores.0.field_name": ["error message"]}
          // For example, update state or display error messages
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
            HAMZA YASIN
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
                  </InputLabel>
                  <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.label}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      fullWidth
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


