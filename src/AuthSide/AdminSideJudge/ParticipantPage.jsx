import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useParams } from "react-router";
import { useDispatch } from 'react-redux'; // Assuming you are using Redux
import { setNextParticipant, getStartContest } from '../../store/actions/contestStartActions';

const participantsData = [
  { name: 'Ruhan Ahmad', task: 'Line Shading', score: 7.8 },
  { name: 'Muaz Ahmad', task: 'Design', score: 7.8 },
  { name: 'Haidar Yasin', task: 'Shading', score: 7.8 },
  { name: 'Abdul Salam', task: 'Livework', score: 7.8 },
  { name: 'Khawar Dogar', task: 'Design', score: 7.8 },
  { name: 'Ruhan Ahmad', task: 'Line Shading', score: 7.8 },
  { name: 'Muaz Ahmad', task: 'Design', score: 7.8 },
  { name: 'Haidar Yasin', task: 'Shading', score: 7.8 },
  { name: 'Abdul Salam', task: 'Livework', score: 7.8 },
  { name: 'Khawar Dogar', task: 'Design', score: 7.8 },
  // Add more participants as needed
];

const ParticipantCard = ({ name, task, score }) => (
  <Card>
    <Box>
      <img src='/person.png' alt='image' width={'100%'} />
      <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center', backgroundColor: '#7c8385', color: 'white' }}>{name}</Typography>
      <Box sx={{ display: 'flex', padding: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{task}</Typography>
        <Typography variant="h5" sx={{ fontSize: '0.9rem', color: 'red', fontWeight: 600 }}>{score}</Typography>
      </Box>
    </Box>
  </Card>
);

const ScoreBoard = ({contest_id,}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', height: '35vh', backgroundColor: '#162f33', color: 'white' }}>
    <Typography variant="h4" sx={{ fontSize: '1rem', mt: '1rem' }}>Participant : 05</Typography>
    <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Total Score : 78</Typography>
    <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center', color: 'white', backgroundColor: '#7c8385', width: '100%' }}>Sefalina Amato</Typography>
  </Box>
);

const ParticipantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getStartContest(80));
        console.log(result.data,"result")
        setJudges(result.data.data.judges);
        const filteredParticipants = result.data.data.participants.filter(
          (participant) => participant.is_judged === 0
        );
        setParticipants(
          filteredParticipants.map((participant) => {
            const fieldsValuesString = participant.fields_values.slice(1, -1);
            const fieldsValues = JSON.parse(
              fieldsValuesString.replace(/\\/g, "")
            );
            return { ...participant, ...fieldsValues };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchContestData();

    const intervalId = setInterval(() => {
      fetchContestData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${"/bgimage.png"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '1rem 5%' }}>
        <Grid container spacing={4} sx={{ alignItems: 'start' }}>
          <Grid item xs={12} sm={3} md={2.5}>
            <Box>
              <ScoreBoard {...participants}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} md={9.5}>
            <Grid container spacing={2}>
              {participants.map((participant, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ParticipantCard {...participant} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ParticipantPage;
