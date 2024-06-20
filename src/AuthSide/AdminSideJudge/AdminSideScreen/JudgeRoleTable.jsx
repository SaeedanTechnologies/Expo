import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Avatar,
  Button
} from '@mui/material';

// Sample data
const rows = [
  { position: 1, name: 'Alice', score: 95 },
  { position: 2, name: 'Bob', score: 90 },
  { position: 3, name: 'Charlie', score: 85 }
];

const JudgeRoleTable = ({ data }) => {
  console.log(data, "KLKK")
  return (
    <Box sx={{ padding: '0rem', minHeight: '20vh', width: '50%' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Table>
          <TableHead sx={{ background: '#F3F6F9' }}>
            <TableRow>
              <TableCell sx={{ color: 'black', borderBottom: 'white' }}>No :</TableCell>
              <TableCell sx={{ color: 'black', borderBottom: 'white', }}>Context Name Name</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index}
                sx={{
                  borderBottom: 'white',
                  color: '#949494',
                  border: (index + 0) % 2 === 0 ? '1px solid red' : 'none'
                }}>
                <TableCell sx={{ color: 'black', borderBottom: 'white' }}> <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px' }} /></TableCell>
                <TableCell sx={{ color: 'black', borderBottom: 'white' }}> <Typography sx={{ display: 'flex' }}><Typography><Avatar src={row.img} alt={`Avatar ${index}`} /></Typography><Typography sx={{ padding: '8px' }}>{row.url}</Typography></Typography></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </TableContainer>
    </Box>
  );
};

export default JudgeRoleTable;
