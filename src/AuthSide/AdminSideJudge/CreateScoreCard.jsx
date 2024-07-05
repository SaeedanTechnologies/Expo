// import React, { useState } from 'react';
// import { Grid, Button, TextField, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const ItemTypes = {
//   BUTTON: 'button',
// };

// const DraggableButton = () => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.BUTTON,
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <Box>
//     <Button
//       ref={drag}
//       sx={{ textTransform: 'none', opacity: isDragging ? 0.5 : 1 }}
//       variant="outlined"
//       color="primary"
//     >
//       Role
//     </Button>
//     <Typography sx={{ fontSize: "11px", fontWeight: 600 , marginTop:'12px'}}>Please Drag and Drop Left to right</Typography>

//     </Box>
//   );
// };

// const DropArea = ({ onDrop, children }) => {
//   const [, drop] = useDrop({
//     accept: ItemTypes.BUTTON,
//     drop: () => {
//       onDrop();
//     },
//   });

//   return (
//     <Box ref={drop} sx={{ minHeight: '200px', padding: '1rem' }}>
//       {children}
//     </Box>
//   );
// };

// const CreateScoreCard = () => {

//   const location = useLocation();
//   const { judges } = location.state || { judges: [] };
//   const names = judges.map(judge => judge.judge_name);
//   const profile = judges.map(judge => judge.profile_picture);
//   console.log(names, "JKLJKKL");

//   const [textFields, setTextFields] = useState([{ name: '', label: '', type: 'text', value: '', required: true }]);
//   console.log(textFields, "textFileds")
//   const token = localStorage.getItem('token');
//   const contest_id = localStorage.getItem('add_register_response');
//   const handleDrop = () => {
//     setTextFields([...textFields, { name: '', label: '', type: 'text', value: '', required: true }]);
//   };

//   const handleTextFieldChange = (index, field, value) => {
//     const newTextFields = [...textFields];
//     newTextFields[index][field] = value;
//     setTextFields(newTextFields);
//   };

//   const navigate = useNavigate();


//   const handleSubmit = () => {
//     const payload = {
//       contest_id: contest_id,
//       judge_name: names,
//       link:`https://frontend.saeedantechpvt.com/admin-login`,
//       email: judges.map(judge => judge.email),
//       profile_picture: profile,
//       fields: textFields.map((field, index) => ({
//         name: field.value,
//         label: field.value,
//         type: field.type,
//         required: field.required,

//       }))
//     };

//     axios.post('https://expoproject.saeedantechpvt.com/api/admin/judges', payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(response => {
//         console.log(response.data);
//         navigate('/links', { state: { contest_id: contest_id } });
//       })
//       .catch(error => {
//         console.error('There was an error!', error);
//       });
//   };


//   // const handleSubmit = () => {
//   //   const payload = {
//   //     contest_id,
//   //     judge_name: names,

//   //     email: judges.map(judge => judge.email),
//   //     profile_picture: profile,
//   //     fields: textFields.map((field, index) => ({
//   //       name: `{index + 1}`,
//   //       label: field.label || `${index + 1}`,
//   //       type: field.type,
//   //       value: field.value,
//   //       required: field.required,
//   //     }))
//   //   };

//   //   axios.post('https://expoproject.saeedantechpvt.com/api/admin/judges', payload, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     }
//   //   })
//   //     .then(response => {
//   //       console.log(response.data);
//   //       navigate('/links');
//   //     })
//   //     .catch(error => {
//   //       console.error('There was an error!', error);
//   //     });
//   // };

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//   return (
//     <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
//       <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isSmall ? '3rem 5%' : '3rem 20%', minHeight: '80vh' }}>
//         <Typography sx={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>Create Score Card</Typography>
//         <Typography sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae sapiente inventore libero accusantium quisquam adipisci numquam quos harum fugiat quis.</Typography>
//         <Grid container spacing={2} mt={2}>
//           <Grid item xs={4} md={6} lg={6} sm={6} sx={{ backgroundColor: '#f9fafc' }}>
//             <Typography sx={{ fontSize: isSmall ? '0.9rem' : '1.3rem', fontWeight: 600 }}>Field Selection</Typography>
//             <br />

//             <DraggableButton />
//           </Grid>
//           <Grid item xs={8} md={6} lg={6} sm={8}>
//             <DropArea onDrop={handleDrop}>
//               {textFields.map((field, index) => (
//                 <TextField
//                   key={index}
//                   label={`Enter Text ${index + 1}`}
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={field.value}
//                   onChange={(e) => handleTextFieldChange(index, 'value', e.target.value)}
//                 />
//               ))}
//             </DropArea>
//             <Button variant='contained' fullWidth onClick={handleSubmit}>Submit</Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </DndProvider>
//   );
// };

// export default CreateScoreCard;


import React, { useState } from 'react';
import { Grid, Button, TextField, Box, Typography, InputAdornment, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import {useSnackbar} from 'notistack'

const ItemTypes = {
  BUTTON: 'button',
};

const DraggableButton = () => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BUTTON,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box>
      <Button
        ref={drag}
        sx={{ textTransform: 'none', opacity: isDragging ? 0.5 : 1 }}
        variant="outlined"
        color="primary"
      >
        Role
      </Button>
      <Typography sx={{ fontSize: "15px", fontWeight: 600, marginTop: '12px' }}>Please Drag and Drop Left to right <FaArrowRight style={{fontSize:'14px'}}/></Typography>
    </Box>
  );
};

const DropArea = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BUTTON,
    drop: () => {
      onDrop();
    },
  });

  return (
    <Box ref={drop} sx={{ minHeight: '200px', padding: '1rem' }}>
      {children}
    </Box>
  );
};

const CreateScoreCard = () => {
 const [loading, setLoading]=useState(false)
  const location = useLocation();
  const { judges } = location.state || { judges: [] };
  const names = judges.map(judge => judge.judge_name);
  const profile = judges.map(judge => judge.profile_picture);

  const { enqueueSnackbar } = useSnackbar();


  const [textFields, setTextFields] = useState([{ name: '', label: '', type: 'text', value: '', required: true }]);
  const token = localStorage.getItem('token');
  const contest_id = localStorage.getItem('add_register_response');

  // Ensure at least one input field is always present
  const initialField = { name: '', label: '', type: 'text', value: '', required: true };

  const handleDrop = () => {
    setTextFields([...textFields, initialField]);
  };

  const handleTextFieldChange = (index, field, value) => {
    const newTextFields = [...textFields];
    newTextFields[index][field] = value;
    setTextFields(newTextFields);
  };

  const handleRemoveField = (index) => {
    if (textFields.length > 1) {
      const updatedFields = [...textFields];
      updatedFields.splice(index, 1);
      setTextFields(updatedFields);
    }
  };

  const navigate = useNavigate();
  const areAllFieldsFilled = () => {
    return textFields.every(field => field.value.trim() !== '');
  };

  const handleSubmit = () => {
    setLoading(true)
    const payload = {
      contest_id: contest_id,
      judge_name: names,
      link: `https://frontend.saeedantechpvt.com/admin-login`,
      email: judges.map(judge => judge.email),
      profile_picture: profile,
      fields: textFields.map((field, index) => ({
        name: field.value,
        label: field.value,
        type: field.type,
        required: field.required,
      }))
    };

    axios.post('https://expoproject.saeedantechpvt.com/api/admin/judges', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {

        enqueueSnackbar('Judges Added Successfully', {variant:'success'})
        localStorage.removeItem('judges');
        navigate('/links', { state: { contest_id: contest_id } });
      })
      .catch(error => {
        console.error('There was an error!', error);
        setLoading(false)
      }

    )
  }

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isSmall ? '3rem 5%' : '3rem 20%', minHeight: '80vh' }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>Create Score Card</Typography>
        <Typography sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae sapiente inventore libero accusantium quisquam adipisci numquam quos harum fugiat quis.</Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={4} md={6} lg={6} sm={6} sx={{ backgroundColor: '#f9fafc' }}>
            <Typography sx={{ fontSize: isSmall ? '0.9rem' : '1.3rem', fontWeight: 600 }}>Field Selection</Typography>
            <br />
            <DraggableButton />
          </Grid>
          <Grid item xs={8} md={6} lg={6} sm={8}>
            <DropArea onDrop={handleDrop}>
              {textFields.map((field, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <TextField
                    label={`Enter Text ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={field.value}
                    onChange={(e) => handleTextFieldChange(index, 'value', e.target.value)}
                    InputProps={index > 0 ? { // Render InputAdornment only if index > 0
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleRemoveField(index)}
                            style={{ padding: '3px 10px', backgroundColor: "transparent", border: '1px solid #c61013', borderRadius: '3px', color: '#c61013' }}
                          >
                            X
                          </Button>
                        </InputAdornment>
                      )
                    } : {}}
                  />
                </Box>
              ))}
            </DropArea>
            <Button variant='contained' fullWidth onClick={handleSubmit}  disabled={loading}>{loading ? <CircularProgress size={24} /> : "Submit"}</Button>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default CreateScoreCard;

