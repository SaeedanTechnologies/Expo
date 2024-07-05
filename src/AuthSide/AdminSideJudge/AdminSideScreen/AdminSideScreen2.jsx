// import { Avatar, Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import DynTable from './DynTable';
// import img1 from "../../../assets/adim-screen/image1.png";
// import img2 from "../../../assets/adim-screen/image2.png";
// import img3 from "../../../assets/adim-screen/image2.png";
// import imagebackground from "../../../assets/adim-screen/imageback.png";
// import imgfrm1 from "../../../assets/adim-screen/imagfram1.png";
// import imgfrm2 from "../../../assets/adim-screen/imagfram2.png";
// import imgfrm3 from "../../../assets/adim-screen/imagfram1.png";
// import Group1 from "../../../assets/adim-screen/Group1 (1).png";
// import Group2 from "../../../assets/adim-screen/Group1 (2).png";
// import Group3 from "../../../assets/adim-screen/Group1 (3).png";
// import { getBehindScreenResults, getStartContest } from '../../../store/actions/contestStartActions';
// import { useDispatch } from 'react-redux';

// const AdminSideScreen2 = () => {
//   const data = [
//     { position: 1, img: imgfrm1, score: 95, color: "#f44336" },
//     { position: 2, img: imgfrm1, score: 90, color: "#f44336" },
//     { position: 3, img: imgfrm1, score: 85, color: "#f44336" },
//     { position: 4, img: imgfrm1, score: 95, color: "#f44336" },
//     { position: 5, img: imgfrm1, score: 90, color: "#f44336" },
//     { position: 6, img: imgfrm1, score: 85, color: "#f44336" }
//   ];

//   const [contestResults, setContestResults] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchContestData = async () => {
//       try {
//         const result = await dispatch(getBehindScreenResults(175));

//           setContestResults(result.data.data);

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchContestData();

//     const intervalId = setInterval(() => {
//       fetchContestData();
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [dispatch]);


//   console.log(contestResults, 'datra')



//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundImage: `url(${imagebackground})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         padding: { xs: '16px', md: '78px' }
//       }}
//     >
//       <Container>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             padding: { xs: '5px', md: '7px' },
//           }}
//         >
//           <Typography
//             variant='h4'
//             sx={{
//               color: 'white',
//               fontFamily: 'Roboto',
//               fontSize: { xs: '1.5rem', md: '2rem' }, // Responsive font size
//               fontWeight: 800,
//               lineHeight: '36px',
//               textAlign: 'center',
//               marginBottom: '1rem'
//             }}
//           >
//             Results
//           </Typography>
//           <Typography
//             variant='h6'
//             sx={{
//               fontFamily: 'Roboto',
//               fontSize: { xs: '16px', md: '20px' }, // Responsive font size
//               fontWeight: '400',
//               lineHeight: '28px',
//               textAlign: 'center',
//               marginBottom: '2rem',
//               color: 'white'
//             }}
//           >
//             Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />sit amet consectetur lorem ipsum dolor sit amet.
//           </Typography>
//           <Box sx={{ marginBottom: { xs: '16px', md: '32px' }, display:'flex', flexDirection:'column', alignItems:'center' }}>
// <Avatar/>
// <Typography sx={{color:'white', fontSize:'2rem'}}>usama</Typography>
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               flexWrap: 'wrap',
//               gap: '16px',
//               marginBottom: '33px'
//             }}
//           >
//             <Box sx={{ marginRight: { xs: '0px', md: '150px' }, marginTop: { xs: '0px', md: '-84px' } }}>
//             <Box sx={{ marginBottom: { xs: '16px', md: '32px' }, display:'flex', flexDirection:'column', alignItems:'center' }}>
// <Avatar/>
// <Typography sx={{color:'white', fontSize:'1rem'}}>usama</Typography>
//           </Box>
//             </Box>
//             <Box sx={{ marginLeft: { xs: '0px', md: '84px' }, marginTop: { xs: '0px', md: '-84px' } }}>
//             <Box sx={{ marginBottom: { xs: '16px', md: '32px' }, display:'flex', flexDirection:'column', alignItems:'center' }}>
// <Avatar/>
// <Typography sx={{color:'white', fontSize:'1rem'}}>usama</Typography>
//           </Box>
//             </Box>
//           </Box>

//           <Box sx={{ padding: '0rem', minHeight: '20vh', width: { xs: '280px', md: '100%' }  }}>

//       <TableContainer  sx={{ backgroundColor: '#333' }}>
//         <Table>
//           <TableHead>
//             <TableRow >
//               <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Position</TableCell>
//               <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Participant Name</TableCell>
//               <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }}>Score</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.map((row, index) => (
//               <TableRow key={index} sx={{ color: '#fff',borderBottom: '1px solid red'  }}>


//                 <TableCell sx={{ color: '#fff',borderBottom: '1px solid red'  }} >




//                 </TableCell>
//                 <TableCell sx={{ display:'flex', alignItems:'center', gap:'5px', color: '#fff',borderBottom: '1px solid red' }}>

//                 <Avatar src={''} alt={''} style={{ width: '50px', height: '50px' }} />
// <Typography>Hamza</Typography>
//                 </TableCell>
//                 <TableCell sx={{ color: '#fff' ,borderBottom: '1px solid red'}}></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>


//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default AdminSideScreen2;


import React, { useEffect, useState } from 'react';
import { Avatar, Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import imagebackground from "../../../assets/adim-screen/imageback.png";
import Group1 from "../../../assets/adim-screen/Group1 (1).png";
import Group2 from "../../../assets/adim-screen/Group1 (2).png";
import Group3 from "../../../assets/adim-screen/Group1 (3).png";
import { getBehindScreenResults } from '../../../store/actions/contestStartActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const AdminSideScreen2 = () => {
  const {id} = useParams()
  const [contestResults, setContestResults] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getBehindScreenResults(id));

          setContestResults(result.data.data);


      } catch (err) {
        console.log(err);
      }
    };

    fetchContestData();

    const intervalId = setInterval(fetchContestData, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch]);
console.log(contestResults, 'dd')


const parseFieldsValues = (fieldsValues) => {
  try {
    const parsedValues = JSON.parse(fieldsValues.replace(/\\/g, ''));
    return parsedValues.name;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return '';
  }
}


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${imagebackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: { xs: '16px', md: '78px' }
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '5px', md: '7px' },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              color: 'white',
              fontFamily: 'Roboto',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 800,
              lineHeight: '36px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            Results
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontFamily: 'Roboto',
              fontSize: { xs: '16px', md: '20px' },
              fontWeight: '400',
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'white'
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>

          <Box sx={{ marginBottom: '20px', position: 'relative' }}>
            {/* 1st Position Image */}
            {contestResults.length > 0 && (
              <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <Avatar src={contestResults[0].participant.fields_values.Upload} alt={contestResults[0].participant.fields_values.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>{parseFieldsValues(contestResults[0].participant.fields_values)}</Typography>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>{contestResults[0].position}</Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '166px',
              marginBottom: '3px',

            }}
          >
            {/* 2nd and 3rd Position Images */}
            {contestResults.slice(1, 3).map((result, index) => (
              <Box key={result.participant_id} sx={{mt:6, textAlign: 'center' }}>
                <Avatar src={result.participant.fields_values.Upload} alt={result.participant.fields_values.name} style={{ width: '70px', height: '70px', marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>{result.participant.fields_values.name}</Typography>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', }}>{result.position}</Typography>
              </Box>
            ))}
          </Box>

          {/* Render positions 4-6 in a table */}
          <TableContainer sx={{ backgroundColor: '#333', width: '80%', marginTop: '20px',  }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff', borderBottom: '1px solid red' }}>Position</TableCell>
                  <TableCell sx={{ color: '#fff', borderBottom: '1px solid red' }}>Participant Name</TableCell>
                  <TableCell sx={{ color: '#fff', borderBottom: '1px solid red' }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contestResults.slice(3, 6).map((result, index) => (
                  <TableRow key={result.participant_id} sx={{ color: '#fff', borderBottom: '1px solid red' }}>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid red' }}>{result.position}</TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', borderBottom: '1px solid red' }}>
                      <Avatar src={result.participant.fields_values.Upload} alt={result.participant.fields_values.name} style={{ width: '30px', height: '30px' }} />
                      <Typography>{result.participant.fields_values.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid red' }}>
  {result.total_score ? result.total_score.toFixed(2) : '0.00'}
</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminSideScreen2;
