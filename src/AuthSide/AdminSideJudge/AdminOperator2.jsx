import React from 'react';
import { Box, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useMediaQuery, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';

const judges = [
  { name: 'M Hamza', image: '/path/to/hamza.jpg', score: 45, isCurrent: true },
  { name: 'M Ruhan', image: '/path/to/ruhan.jpg', score: 45, isCurrent: true },
  { name: 'M Salam', image: '/path/to/salam.jpg', score: 45, isCurrent: true },
  { name: 'M Muaz', image: '/path/to/muaz.jpg', score: 45, isCurrent: true},
  { name: 'M Yasin', image: '/path/to/yasin.jpg', score: 45, isCurrent: true},

];

const participant = { name: 'Hamza', status: 'Now In Progress', image: '/path/to/participant.jpg' };

const StyledAvatar = styled(Avatar)(({ theme, isCurrent }) => ({
  width: 60,
  height: 60,
  border: `4px solid ${isCurrent ? 'green' : 'red'}`,
  margin: theme.spacing(1),
}));

const AdminOperator2 = () => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/admin-operator3')
  }
  return (
    <Box
      sx={{


        padding: isSmall ? '1rem 5%' :'1rem 30%',
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom sx={{textAlign:'center'}}>
        Admin
      </Typography>
      <Typography variant="body1" gutterBottom sx={{textAlign:'center'}}>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
      </Typography>

      <TableContainer sx={{ marginY: 1 }}>
        <Table>
          <TableHead sx={{backgroundColor:'#f3f6f9'}}>
            <TableRow sx={{display:'flex'}}>
            <TableCell sx={{ flex: 3 }}>Participant Name</TableCell>
            <TableCell sx={{ flex: 1 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{display:'flex'}}>
            <TableCell sx={{ flex: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={participant.image} alt={participant.name} sx={{ marginRight: 2, height:'30px', width:'30px' }} />
              <Typography sx={{fontSize:'0.9rem'}}>  {participant.name}</Typography>
              </Box>
            </TableCell>
            <TableCell sx={{ flex: 1 }}>
              <Typography sx={{ color: 'green', fontWeight:600, fontSize:'0.8rem' }}>{participant.status}</Typography>
            </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ width: '100%', fontWeight:600, textAlign: 'left' }}>
        Judges
      </Typography>

      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        {judges.map((judge, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <StyledAvatar src={judge.image} alt={judge.name} isCurrent={judge.isCurrent} />
            <Typography sx={{fontWeight:600}}>{judge.name}</Typography>
            {judge.score && <Typography sx={{color:'green', fontSize:'0.8rem'}}>Score {judge.score}</Typography>}
          </Box>
        ))}
      </Box>
      <br/>
<Divider/>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 1,
          justifyContent:'space-between',
          padding: 2,
          // backgroundColor: '#f1f1f1',
          borderRadius: '8px',
          width: '100%',
          maxWidth: 500,
        }}
      >

     <Box sx={{
       display: 'flex',
          alignItems: 'center',

          justifyContent:'space-between',
     }}>
     <Avatar src={participant.image} alt={participant.name} sx={{ marginRight: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" sx={{fontSize:'0.9rem', fontWeight:600}}>{participant.name}</Typography>

        </Box>
     </Box>
        <Button variant="contained" color="primary" sx={{textTransform:'none'}}
        onClick={handleClick}


        >
          Now Judge Hamza
        </Button>
      </Box>
    </Box>
  );
};

export default AdminOperator2;
