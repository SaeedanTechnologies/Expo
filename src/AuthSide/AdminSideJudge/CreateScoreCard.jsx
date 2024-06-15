import React, { useState } from 'react';
import { Grid, Button, TextField, Box, Typography } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router';

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
  const [textFields, setTextFields] = useState(['', '', '', '']);

  const handleDrop = () => {
    setTextFields([...textFields, '']);
  };
const navigate = useNavigate()
const handleLink = ()=>{
navigate('/links')
}


  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 20%' }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>Create Score Card</Typography>
        <Typography sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae sapiente inventore libero accusantium quisquam adipisci numquam quos harum fugiat quis.</Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6} sx={{ backgroundColor: '#f9fafc' }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Field Selection</Typography>
            <br />
            <DraggableButton />
          </Grid>
          <Grid item xs={6}>
            <DropArea onDrop={handleDrop}>
              {textFields.map((_, index) => (
                <TextField
                  key={index}
                  label={`Enter Text ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              ))}
            </DropArea>

            <Button variant='contained' fullWidth onClick={handleLink}> Next</Button>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default CreateScoreCard;
