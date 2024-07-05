// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   useMediaQuery,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate, useParams } from "react-router";
// import {
//   getStartContest,
//   setNextParticipant,
// } from "../../store/actions/contestStartActions";
// import { useDispatch } from "react-redux";

// const AdminOperator = () => {
//   const { id } = useParams();
//   const [loadingbtn, setLoadingbtn] = useState(false);
//   const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const [judges, setJudges] = useState([]);
//   const [score, setScore] = useState([]);

//   const [participants, setParticipants] = useState([]);
//   const [allScoresGiven, setAllScoresGiven] = useState(false);
//   const dispatch = useDispatch();
//   const [allJudges, setAllJudges] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const StyledAvatar = styled(Avatar)(({ theme, isCurrent, judgeId }) => ({
//     width: 60,
//     height: 60,
//     border: `4px solid ${
//       score.some(
//         (score) =>
//           score.judge_id === judgeId &&
//           score.participant_id === participants[0]?.id
//       )
//         ? "green"
//         : "red"
//     }`,
//     margin: theme.spacing(1),
//   }));

//   const [clickedParticipantId, setClickedParticipantId] = useState(null);

//   useEffect(() => {
//     // Check if the clicked participant is still in the array
//     const participantExists = participants.some(
//       (participant) => participant.id === clickedParticipantId
//     );
//     if (!participantExists) {
//       setClickedParticipantId(null); // Reset if participant is not found
//     }
//   }, [participants]);

//   const handleClick = async (id, contestId) => {
//     try {
//       const res = await dispatch(setNextParticipant(contestId, id));

//       setClickedParticipantId(id);
//     } catch (error) {
//       console.error("Failed to send request:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchContestData = async () => {
//       try {
//         const result = await dispatch(getStartContest(id));
//         setJudges(result.data.data.judges);
//         setScore(result.data.data.total_scores);
//         const filteredParticipants = result.data.data.participants.filter(
//           (participant) => participant.is_judged === 0
//         );
//         setParticipants(
//           filteredParticipants.map((participant) => {
//             const fieldsValuesString = participant.fields_values.slice(1, -1);
//             const fieldsValues = JSON.parse(
//               fieldsValuesString.replace(/\\/g, "")
//             );
//             return { ...participant, ...fieldsValues };
//           })
//         );
//         setAllJudges(result.data.data.participants);
//         setLoading(false);
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

//   const handleAllRecords = () => {
//     navigate("/all-records", { state: { id: id } });
//   };

//   useEffect(() => {
//     setParticipants(participants);
//   }, [participants]);

//   if (loading) {
//     // Display loader while loading
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "80vh",
//       }}
//     >
//       <Box
//         sx={{
//           padding: isSmall ? "1rem 5%" : "1rem 30%",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight={600}
//           gutterBottom
//           sx={{ textAlign: "center" }}
//         >
//           Admin
//         </Typography>
//         <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
//           consectetur lorem ipsum dolor sit amet.
//         </Typography>

//         <TableContainer sx={{ marginY: 1 }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//               <TableRow sx={{ display: "flex" }}>
//                 <TableCell sx={{ flex: 3 }}>Participant Name</TableCell>
//                 <TableCell sx={{ flex: 1 }}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             {/* <TableBody>
//               <TableRow sx={{ display: "flex" }}>
//                 <TableCell sx={{ flex: 3 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Avatar
//                       src={participants[0]?.image}
//                       alt={participants[0]?.name}
//                       sx={{ marginRight: 2, height: "30px", width: "30px" }}
//                     />
//                     <Typography sx={{ fontSize: "0.9rem" }}>
//                       {participants[0]?.name}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ flex: 1 }}>
//                   <Typography
//                     sx={{ color: "green", fontWeight: 600, fontSize: "0.8rem" }}
//                   >
//                     Now in Progress
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             </TableBody> */}

//             <TableBody>
//               {participants.length === 0 ? (
//                 <TableRow sx={{ display: "flex" }}>
//                   <TableCell sx={{ flex: 4, textAlign: "center" }}>
//                     <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
//                       No participants remaining
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 <TableRow sx={{ display: "flex" }}>
//                   <TableCell sx={{ flex: 3 }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar
//                         src={participants[0]?.image}
//                         alt={participants[0]?.name}
//                         sx={{ marginRight: 2, height: "30px", width: "30px" }}
//                       />
//                       <Typography sx={{ fontSize: "0.9rem" }}>
//                         {participants[0]?.name}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ flex: 1 }}>
//                     <Typography
//                       sx={{
//                         color: "green",
//                         fontWeight: 600,
//                         fontSize: "0.8rem",
//                       }}
//                     >
//                       Now in Progress
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{ width: "100%", fontWeight: 600, textAlign: "left" }}
//         >
//           Judges
//         </Typography>
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           {judges?.map((judge, index) => (
//             <Box key={index} sx={{ textAlign: "center" }}>
//               <StyledAvatar
//                 src={judge?.image}
//                 alt={judge?.name}
//                 isCurrent={judge?.isCurrent}
//                 judgeId={judge?.id}
//               />

//               <Typography sx={{ fontWeight: 600 }}>{judge?.name}</Typography>
//               {score
//                 .filter(
//                   (score) =>
//                     score?.judge_id === judge?.id &&
//                     score?.participant_id === participants[0]?.id
//                 )
//                 .map((score, ind) => (
//                   <Typography
//                     key={ind}
//                     sx={{ color: "green", fontSize: "0.8rem" }}
//                   >
//                     Score{" "}
//                     {score?.total_score ? score?.total_score.toFixed(2) : ""}
//                   </Typography>
//                 ))}
//             </Box>
//           ))}
//         </Box>
//         <br />
//         <Divider />
//         {participants.length === 0 ? (
//           <>
//             <Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAllRecords}
//                 sx={{ width: "100%", textTransform: "none" }}
//               >
//                 All Records
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginTop: 1,
//                 justifyContent: "space-between",
//                 padding: 2,
//                 borderRadius: "8px",
//                 width: "100%",
//                 maxWidth: 500,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Avatar
//                   src={participants[0]?.image}
//                   alt={participants[0]?.name}
//                   sx={{ marginRight: 2 }}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography
//                     variant="body1"
//                     sx={{ fontSize: "0.9rem", fontWeight: 600 }}
//                   >
//                     {participants[0]?.name}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() =>
//                   handleClick(participants[0]?.id, participants[0]?.contest_id)
//                 }
//                 disabled={participants[0]?.id === clickedParticipantId}
//                 sx={{ textTransform: "none" }}
//               >
//                 Now Judge {participants[0]?.name}
//               </Button>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AdminOperator;


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery,
  Divider,
  CircularProgress,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import {
  getStartContest,
  setNextParticipant,
  setApprovidParticipant,
} from "../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";

const AdminOperator = () => {
  const { id } = useParams();
  const contest_id=id;
  const [loadingbtn, setLoadingbtn] = useState(false);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [score, setScore] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [allScoresGiven, setAllScoresGiven] = useState(false);
  const dispatch = useDispatch();
  const [allJudges, setAllJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);

  // const handleOpenModal = (judge) => {
  //   setSelectedJudge(judge);


  //   console.log(judge, 'ddfsdfdfdf')
  //   setOpenModal(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  //   setSelectedJudge(null);
  // };

  const [selectedJudgeScores, setSelectedJudgeScores] = useState([]);

  const handleOpenModal = (judge) => {
    setSelectedJudge(judge);
    const judgeScores = score.filter(
      (score) => score.judge_id === judge.id
    );
    setSelectedJudgeScores(judgeScores);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedJudge(null);
    setSelectedJudgeScores([]);
  };

  const StyledAvatar = styled(Avatar)(({ theme, isCurrent, judgeId }) => ({
    width: 60,
    height: 60,
    border: `4px solid ${
      score.some(
        (score) =>
          score.judge_id === judgeId &&
          score.participant_id === participants[0]?.id
      )
        ? "green"
        : "red"
    }`,
    margin: theme.spacing(1),
    cursor: "pointer",
  }));

  const [clickedParticipantId, setClickedParticipantId] = useState(null);

  useEffect(() => {
    // Check if the clicked participant is still in the array
    const participantExists = participants.some(
      (participant) => participant.id === clickedParticipantId
    );
    if (!participantExists) {
      setClickedParticipantId(null); // Reset if participant is not found
    }
  }, [participants]);


  const handleClick = async (id, contestId) => {
    try {
      const res = await dispatch(setNextParticipant(contestId, id));

      setClickedParticipantId(id);
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };





const handleApproved = async (id, contest_id) => {

  try {

    const res = await dispatch(setApprovidParticipant(contest_id, id));

    setClickedParticipantId(id);
  } catch (error) {
    console.error("Failed to send request:", error);
  }
};



  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getStartContest(id));
        setJudges(result.data.data.judges);
        setScore(result.data.data.total_scores);
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
        setAllJudges(result.data.data.participants);
        setLoading(false);
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

  const handleAllRecords = () => {
    navigate("/all-records", { state: { id: id } });
  };

  useEffect(() => {
    setParticipants(participants);
  }, [participants]);

  if (loading) {
    // Display loader while loading
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          padding: isSmall ? "1rem 5%" : "1rem 30%",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Admin
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>

        <TableContainer sx={{ marginY: 1 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow sx={{ display: "flex" }}>
                <TableCell sx={{ flex: 3 }}>Participant Name</TableCell>
                <TableCell sx={{ flex: 1 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              <TableRow sx={{ display: "flex" }}>
                <TableCell sx={{ flex: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={participants[0]?.image}
                      alt={participants[0]?.name}
                      sx={{ marginRight: 2, height: "30px", width: "30px" }}
                    />
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {participants[0]?.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>
                  <Typography
                    sx={{ color: "green", fontWeight: 600, fontSize: "0.8rem" }}
                  >
                    Now in Progress
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody> */}

            <TableBody>
              {participants.length === 0 ? (
                <TableRow sx={{ display: "flex" }}>
                  <TableCell sx={{ flex: 4, textAlign: "center" }}>
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      No participants remaining
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow sx={{ display: "flex" }}>
                  <TableCell sx={{ flex: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={participants[0]?.image}
                        alt={participants[0]?.name}
                        sx={{ marginRight: 2, height: "30px", width: "30px" }}
                      />
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {participants[0]?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: "green",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      Now in Progress
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ width: "100%", fontWeight: 600, textAlign: "left" }}
        >
          Judges
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {judges?.map((judge, index) => (
            <Box
              key={index}
              sx={{ textAlign: "center" }}
              onClick={() => handleOpenModal(judge)}
            >
              <StyledAvatar
                src={judge?.image}
                alt={judge?.name}
                isCurrent={judge?.isCurrent}
                judgeId={judge?.id}
              />

              <Typography sx={{ fontWeight: 600 }}>{judge?.name}</Typography>
              {score
                .filter(
                  (score) =>
                    score?.judge_id === judge?.id &&
                    score?.participant_id === participants[0]?.id
                )
                .map((score, ind) => (
                  <Typography
                    key={ind}
                    sx={{ color: "green", fontSize: "0.8rem" }}
                  >
                    Score{" "}
                    {score?.total_score ? score?.total_score.toFixed(2) : ""}
                  </Typography>
                ))}
            </Box>
          ))}
        </Box>
        <br />
        <Divider />
        {participants.length === 0 ? (
          <>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAllRecords}
                sx={{ width: "100%", textTransform: "none" }}
              >
                All Records
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 1,
                justifyContent: "space-between",
                padding: 2,
                borderRadius: "8px",
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  src={participants[0]?.image}
                  alt={participants[0]?.name}
                  sx={{ marginRight: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    {participants[0]?.name}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleClick(participants[0]?.id, participants[0]?.contest_id)
                }
                disabled={participants[0]?.id === clickedParticipantId}
                sx={{ textTransform: "none" }}
              >
                Now Judge {participants[0]?.name}
              </Button>
                <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleApproved(participants[0]?.id, participants[0]?.contest_id)
                }
                disabled={participants[0]?.id === clickedParticipantId}
                sx={{ textTransform: "none" }}
              >
               Publish
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Judge Details
          </Typography>
          {selectedJudge && (
            <>
              <Typography sx={{ mt: 2 }}>
                Name: {selectedJudge.name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Email: {selectedJudge.email}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Scores:</strong>
              </Typography>
              {selectedJudgeScores.length === 0 ? (
                <Typography sx={{ mt: 2 }}>
                  No scores available.
                </Typography>
              ) : (
                selectedJudgeScores.map((score, index) => (
                  <Typography key={index} sx={{ mt: 1 }}>
                    Participant ID {score.participant_id}:{" "}
                    {score.total_score ? score.total_score.toFixed(2) : "No Score"}
                  </Typography>
                ))
              )}
            </>
          )}
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminOperator;
