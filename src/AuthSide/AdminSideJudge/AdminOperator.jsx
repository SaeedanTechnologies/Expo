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
  getBehindScreen,
} from "../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";
import UploadVideoDialogBox from "./UploadVideo";
import {Dialog} from "@mui/material";
const AdminOperator = () => {
  const { id } = useParams();
  const contest_id = id;
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
  const [fieldScores, setFieldScores] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getBehindScreen(id));

        setFieldScores(result?.data?.data?.total_scores);

        const filteredParticipants = result?.data?.data?.participants?.filter(
          (participant) => participant.is_judged === 0
        );
        setParticipants(
          filteredParticipants?.map((participant) => {
            const fieldsValuesString = participant?.fields_values?.slice(1, -1);
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
  }, [dispatch, id]);

  const handleFile = (()=>{
    navigate(`/upload-file/${contest_id}`)
  })

  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  };
  const [selectedJudgeScores, setSelectedJudgeScores] = useState([]);
  console.log(selectedJudgeScores, "scoreee");
  // const [allScoresGiven, setAllScoresGiven] = useState(false);
  const handleOpenModal = (judge) => {
    setSelectedJudge(judge);
    const judgeScores = score.filter((score) => score.judge_id === judge.id);
    setSelectedJudgeScores(judgeScores);
    setOpenModal(true);
  };


  const handleNext = (()=>{
    navigate(`/admin-contest-start/${contest_id}`)
  })


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
const [loadingPublish, setLoadingPublish] = useState(false)
  const handleApproved = async (id, contest_id) => {
    setLoadingPublish(true)
    try {
      const res = await dispatch(setApprovidParticipant(contest_id, id));

      setClickedParticipantId(id);
      setLoadingPublish(true)

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

        const currentParticipantId = result.data.data.participants[0]?.id;
        const currentScores = result.data.data.total_scores.filter(
          (score) => score.participant_id === currentParticipantId
        );
        setAllScoresGiven(
          currentScores.length === result.data.data.judges.length
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
        minHeight: "90vh",
        padding: isSmall ? "1rem 5%" : "1rem 30%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          // backgroundColor:'red',
          width: "100%",
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

        <TableContainer sx={{ marginY: 1, width: "100%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow sx={{ display: "flex" }}>
                <TableCell sx={{ flex: 3 }}>Participant Name</TableCell>
                <TableCell sx={{ flex: 1 }}>Status</TableCell>
              </TableRow>
            </TableHead>

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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            overflow: "auto",
          }}
        >
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

            </Box>

            {allScoresGiven ? (




              <Button  variant="contained"
                color="primary"
                onClick={() =>
                  handleApproved(
                    participants[0]?.id,
                    participants[0]?.contest_id
                  )
                }

                sx={{ textTransform: "none", width: "100%" }} >{loadingPublish ? <CircularProgress size={24} /> : "Publish"}</Button>



            ) : null}
          </>
        )}
<br />
           <Box sx={{marginTop:'12px'}}>
        <Button variant='contained' sx={{width:'100%'}} onClick={handleOpenUploadDialog}>Upload File</Button>
      </Box>
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
            maxHeight:'80vh',
            overflowY:'auto'
          }}
        >
          {selectedJudge && (
            <>
              <Typography sx={{ mt: 2 }}>
                <strong>Scores:</strong>
              </Typography>
              {selectedJudgeScores.length === 0 ? (
                <Typography sx={{ mt: 2 }}>No scores available.</Typography>
              ) : (
                <>

                {/* --------------modal ka data ---------- */}

                <div>
      {selectedJudgeScores.map((score, index) => {
        // Parse the participant name
        const participantName = (() => {
          try {
            const outerParsed = JSON.parse(score.participant.fields_values);
            const innerParsed = JSON.parse(outerParsed);
            return innerParsed.name || "Unknown";
          } catch (e) {
            console.error("Failed to parse fields_values:", e);
            return "Unknown";
          }
        })();

        // Get the scores for the current participant
        const participantFieldScores = fieldScores.filter(
          (val) => val.participant_id === score.participant_id
        );

        return (
          <React.Fragment key={index}>
            <Typography sx={{ mt: 1, fontWeight: "700" }}>
              Participant Name {participantName}:
            </Typography>

            <Box>
              {participantFieldScores.map((fieldScore, scoreIndex) => (
                <Box key={scoreIndex}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.2rem",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {fieldScore.field_name}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        fontWeight: 600,
                      }}
                    >
                      {fieldScore.total_score.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography>Total</Typography>
              <Typography>
                {score.total_score
                  ? score.total_score.toFixed(2)
                  : "No Score"}
              </Typography>
            </Box>



            {index < selectedJudgeScores.length - 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        );
      })}
    </div>

{/* -----------------------modal ka data end---------- */}

                </>
              )}
            </>
          )}
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>




        <Dialog
        open={uploadDialogOpen}
        onClose={handleCloseUploadDialog}
        maxWidth="md"
        fullWidth
      >
        <UploadVideoDialogBox contest_id={contest_id} onClose={handleCloseUploadDialog} />
      </Dialog>
    </Box>
  );
};

export default AdminOperator;
