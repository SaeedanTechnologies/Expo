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
  Avatar
} from '@mui/material';

const JudgeRoleTable = ({ data }) => {
  return (
    <Box sx={{ padding: '1rem', minHeight: '20vh', width: '100%', maxWidth: '500px', margin: 'auto' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Table>
          <TableHead sx={{ background: '#F3F6F9' }}>
            <TableRow>
              <TableCell sx={{ color: 'black', borderBottom: 'white' }}>No :</TableCell>
              <TableCell sx={{ color: 'black', borderBottom: 'white' }}>Context Name Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: 'none',
                  ...(index < 2 && {
                    border: '1px solid #D90B0F',
                  marginBottom:'2px'
                  }),
                }}
                
                
              >
                <TableCell sx={{ color: 'black', borderBottom: 'none' }}>
                  <img src={row.image} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell sx={{ color: 'black', borderBottom: 'none' }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={row.image} alt={`Avatar ${index}`} />
                    <Typography sx={{ padding: '0 8px' }}>{row.url}</Typography>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JudgeRoleTable;
