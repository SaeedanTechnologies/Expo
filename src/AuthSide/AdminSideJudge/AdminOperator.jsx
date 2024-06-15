import React from 'react';
import { Box, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const judges = [
  { name: 'M Hamza', image: '/path/to/hamza.jpg', score: 45, isCurrent: true },
  { name: 'M Ruhan', image: '/path/to/ruhan.jpg', isCurrent: false },
  { name: 'M Salam', image: '/path/to/salam.jpg', isCurrent: false },
  { name: 'M Muaz', image: '/path/to/muaz.jpg', isCurrent: false },
  { name: 'M Yasin', image: '/path/to/yasin.jpg', isCurrent: false },
];

const participant = { name: 'Hamza', status: 'Now In Progress', image: '/path/to/participant.jpg' };

const StyledAvatar = styled(Avatar)(({ theme, isCurrent }) => ({
  width: 60,
  height: 60,
  border: `2px solid ${isCurrent ? 'green' : 'red'}`,
  margin: theme.spacing(1),
}));

const AdminOperator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '1rem 30%',
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Admin
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
      </Typography>

      <TableContainer component={Paper} sx={{ marginY: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Participant Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={participant.image} alt={participant.name} sx={{ marginRight: 2 }} />
                  {participant.name}
                </Box>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'green' }}>{participant.status}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ width: '100%', textAlign: 'left' }}>
        Judges
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {judges.map((judge, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <StyledAvatar src={judge.image} alt={judge.name} isCurrent={judge.isCurrent} />
            <Typography>{judge.name}</Typography>
            {judge.score && <Typography>Score {judge.score}</Typography>}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 3,
          padding: 2,
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Avatar src={participant.image} alt={participant.name} sx={{ marginRight: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1">{participant.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Singer
          </Typography>
        </Box>
        <Button variant="contained" color="primary" disabled>
          Now Judge Ruhan
        </Button>
      </Box>
    </Box>
  );
};

export default AdminOperator;
