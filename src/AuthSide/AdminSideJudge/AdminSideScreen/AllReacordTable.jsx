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



const AllReacordTable = ({ data }) => {
  console.log(data, "KLKK")
  return (
    <Box sx={{ padding: '0rem', minHeight: '20vh', width: '50%', marginBottom:'33px' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Table>
          <TableHead sx={{ background: '#F3F6F9' }}>
            <TableRow>
              <TableCell sx={{ color: 'black', borderBottom: 'white' }}>Position</TableCell>
              <TableCell sx={{ color: 'black', borderBottom: 'white' }}>Participant Name</TableCell>
              <TableCell sx={{ color: 'black', borderBottom: 'white', textAlign: 'end' }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index}
                sx={{
                  borderBottom: 'white',
                  color: '#949494',
                  borderBottom: (index + 1) % 3 === 0 ? '1px solid #949494' : 'none'
                }}>
                <TableCell sx={{ color: 'black', borderBottom: 'white' }}> <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px' }} /></TableCell>
                <TableCell sx={{ color: 'black', borderBottom: 'white' }}> <Typography sx={{ display: 'flex' }}><Typography><Avatar src={row.name} alt={`Avatar ${index}`} /></Typography><Typography sx={{ padding: '8px' }}>{row.name}</Typography></Typography></TableCell>
                <TableCell sx={{ color: 'black', borderBottom: 'white', textAlign: 'end' }}>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <Button
            sx={{
              width: '50%', // Adjust width here to match the table's width
              height: '36px',
              backgroundColor: '#D37476',
              padding: '6px 49px',
              borderRadius: '4px 0px 0px 0px',
            }}
          >
            Send Transfer
          </Button>
          <Button
            sx={{
              width: '50%', // Adjust width here to match the table's width
              height: '36px',
              marginLeft: '12px',
              background: 'linear-gradient(180deg, #D90B0F 0%, #8F1B1E 100%)',
              padding: '6px 49px',
              borderRadius: '0px 4px 0px 0px',
              color: 'white',
            }}
          >
            Send Transfer
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default AllReacordTable;
