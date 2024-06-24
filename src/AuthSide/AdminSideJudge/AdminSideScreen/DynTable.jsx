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
import Positions from '../../../page/components/Positions';

// Sample data
const rows = [
  { position: 1, name: 'Alice', score: 95, color: "#f44336" },
  { position: 2, name: 'Bob', score: 90, color: "#f44336" },
  { position: 3, name: 'Charlie', score: 85, color: "#f44336" }
];

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


                <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }} >

                <Positions number={row.position} color={row.color} />


                </TableCell>
                <TableCell sx={{ display:'flex', alignItems:'center', gap:'5px', color: '#fff',borderBottom: '1px solid red' }}>

                <Avatar src={''} alt={''} style={{ width: '50px', height: '50px' }} />
<Typography>Hamza</Typography>
                </TableCell>
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
