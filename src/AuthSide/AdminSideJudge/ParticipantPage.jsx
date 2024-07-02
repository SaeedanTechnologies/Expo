import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useParams } from "react-router";
import { useDispatch } from 'react-redux'; // Assuming you are using Redux
import { setNextParticipant, getStartContest, getBehindScreen } from '../../store/actions/contestStartActions';

const ParticipantCard = ({ name, task, score,partcipentId }) => (
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

const ScoreBoard = ({ judgeName, totalScore,partcipentId,participantsName }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', height: '35vh', backgroundColor: '#162f33', color: 'white' }}>
    <Typography variant="h4" sx={{ fontSize: '1rem', mt: '1rem' }}>{partcipentId}</Typography>
    <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Total Score : {totalScore}</Typography>
    <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center', color: 'white', backgroundColor: '#7c8385', width: '100%' }}>{participantsName}</Typography>
  </Box>
);

const ParticipantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [totalScores, setTotalScores] = useState([]);
  const [participants, setParticipents] = useState([]);
  const [score, setScore] = useState([]);
  const [participantsName, setParticipentsName] = useState("");
  console.log(participants,"juderr")
  const partcipentId= participants.map(id=>id.participant_id);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getBehindScreen(id));
        setJudges(result.data.data.judges);
        setTotalScores(result.data.data.total_scores);
        setParticipents(result.data.data.participants);
        setParticipentsName(result.data.data.now_in_progress)
        setScore(result.data.data.total_scores)
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

  const judgeName = judges.length > 0 ? judges[0].name : "Unknown";
  const totalScore = totalScores.reduce((acc, curr) => acc + parseInt(curr.total_score, 10), 0);
  // const total_score= score.total_scores.map(id=>id.total_score);
  // console.log(total_score, "total_scores")
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
              <ScoreBoard judgeName={judgeName} totalScore={totalScore} partcipentId={partcipentId} participantsName={participantsName}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} md={9.5}>
            <Grid container spacing={2}>
              {judges.map((judge, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ParticipantCard
                    name={judge.name}
                    task="score"
                    partcipentId={partcipentId}
                    score={totalScores.find(score => score.judge_id === judge.id)?.total_score || "N/A"}
                  />
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




// import React, { useState, useEffect } from 'react';
// import { Card, Typography, Grid, Box } from '@mui/material';
// import { useNavigate, useParams } from "react-router";
// import { useDispatch } from 'react-redux';
// import { getBehindScreen } from '../../store/actions/contestStartActions';

// const ParticipantCard = ({ name, scores }) => (
//   <Card>
//     <Box>
//       <img src='/person.png' alt='image' width={'100%'} />
//       <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center', backgroundColor: '#7c8385', color: 'white' }}>{name}</Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem' }}>
//         {scores.map(score => (
//           <Box key={score.field_name} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
//             <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{score.field_name}</Typography>
//             <Typography variant="h5" sx={{ fontSize: '0.9rem', color: 'red', fontWeight: 600 }}>{score.total_score.toFixed(2)}</Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   </Card>
// );

// const ScoreBoard = ({ totalScore, judgesCount }) => (
//   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', height: '35vh', backgroundColor: '#162f33', color: 'white' }}>
//     <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Total Score : {totalScore.toFixed(2)}</Typography>
//     <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center', color: 'white', backgroundColor: '#7c8385', width: '100%' }}>Total Judges: {judgesCount}</Typography>
//   </Box>
// );

// const ParticipantPage = () => {
//   const { id } = useParams();
//   const [judges, setJudges] = useState([]);
//   const [totalScores, setTotalScores] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [participantsName, setParticipantsName] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchContestData = async () => {
//       try {
//         const result = await dispatch(getBehindScreen(id));
//         const { judges, total_scores: totalScores, participants, now_in_progress: participantsName } = result.data.data;
//         setJudges(judges);
//         setTotalScores(totalScores);
//         setParticipants(participants);
//         setParticipantsName(participantsName);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchContestData();

//     const intervalId = setInterval(() => {
//       fetchContestData();
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [dispatch, id]);

//   const totalScore = totalScores.reduce((acc, curr) => acc + parseFloat(curr.total_score), 0);
//   const judgesCount = judges.length; // Counting the total number of judges
//   console.log(judgesCount,"judegcouht")
//   return (
//     <Box
//       sx={{
//         backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${"/bgimage.png"})`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         width: "100%",
//       }}
//     >
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '1rem 5%' }}>
//         <Grid container spacing={4} sx={{ alignItems: 'start' }}>
//           <Grid item xs={12} sm={3} md={2.5}>
//             <Box>
//               <ScoreBoard totalScore={totalScore} judgesCount={judgesCount} />
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={9} md={9.5}>
//             <Grid container spacing={2}>
//               {participants.map((participant, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <ParticipantCard
//                     name={participant.fields_values.name}
//                     scores={totalScores.filter(score => score.participant_id === participant.id)}
//                     judgesCount={judgesCount}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ParticipantPage;


