import React, { useState } from 'react';
import { Grid, Button, TextField, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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
    <Button
      ref={drag}
      sx={{ textTransform: 'none', opacity: isDragging ? 0.5 : 1 }}
      variant="outlined"
      color="primary"
    >
      Role
    </Button>
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
  const location = useLocation();
  const { judges } = location.state || { judges: [] };
  const names = judges.map(judge => judge.judge_name); // Correct the field name
  
  console.log(names, "JKLJKKL");
  
  const [textFields, setTextFields] = useState([{ name: '', label: '', type: 'text', value: '', required: true }]);
  console.log(textFields, "textFileds")
  const token = localStorage.getItem('token');
  const contest_id = localStorage.getItem('add_register_response');
  const handleDrop = () => {
    setTextFields([...textFields, { name: '', label: '', type: 'text', value: '', required: true }]);
  };

  const handleTextFieldChange = (index, field, value) => {
    const newTextFields = [...textFields];
    newTextFields[index][field] = value;
    setTextFields(newTextFields);
  };
 
  const navigate = useNavigate();
 
  const handleSubmit = () => {
    const payload = {
      contest_id,
      judge_name: names,
    
      email: judges.map(judge => judge.email),
      profile_picture: null,
      fields: textFields.map((field, index) => ({
        name: `field_${index + 1}`,
        label: field.label || `Field ${index + 1}`,  // Ensure label is set
        type: field.type,
        value: field.value,
        required: field.required,
      }))
    };

    axios.post('https://expoproject.saeedantechpvt.com/api/admin/judges', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response.data);
      navigate('/links');
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

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
            <Typography sx={{ fontSize: isSmall ? '0.9rem': '1.3rem', fontWeight: 600 }}>Field Selection</Typography>
            <br />
            <DraggableButton />
          </Grid>
          <Grid item xs={8} md={6} lg={6} sm={8}>
            <DropArea onDrop={handleDrop}>
              {textFields.map((field, index) => (
                <TextField
                  key={index}
                  label={`Enter Text ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={field.value}
                  onChange={(e) => handleTextFieldChange(index, 'value', e.target.value)}
                />
              ))}
            </DropArea>
            <Button variant='contained' fullWidth onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default CreateScoreCard;
