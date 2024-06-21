import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Typography
} from '@mui/material';



const DynTable = ({ data }) => {
    console.log(data, "KLKK")
  return (
    <Box sx={{ padding: '0rem', minHeight: '20vh', width: { xs: '280px', md: '100%' }  }}>
     
      <TableContainer component={Paper} sx={{ backgroundColor: '#333' }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Position</TableCell>
              <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Participant Name</TableCell>
              <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index} sx={{ color: '#fff',borderBottom: '1px solid red'  }}>
                <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }} > <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px' }} /></TableCell>
                <TableCell sx={{ color: '#fff',borderBottom: '1px solid red' }}> <Typography sx={{display:'flex'}}><Typography><Avatar src={row.name} alt={`Avatar ${index}`} /></Typography><Typography sx={{padding:'8px'}}>{row.name}</Typography></Typography></TableCell>
                <TableCell sx={{ color: '#fff' ,borderBottom: '1px solid red'}}>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};



export default DynTable;
