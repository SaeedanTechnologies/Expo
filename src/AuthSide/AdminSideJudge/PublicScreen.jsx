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
//   Modal,
//   Grid,
//   Card,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate, useParams } from "react-router";
// import {
//   getBehindScreen,
//   getStartContest,
//   setNextParticipant,
// } from "../../store/actions/contestStartActions";
// import { useDispatch } from "react-redux";

// const PublicScreen = () => {
//   const { id } = useParams();
//   const [loadingbtn, setLoadingbtn] = useState(false);
//   const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const [judges, setJudges] = useState([]);
//   const [scores, setScore] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [allScoresGiven, setAllScoresGiven] = useState(false);
//   const dispatch = useDispatch();
//   const [allJudges, setAllJudges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedJudge, setSelectedJudge] = useState(null);
//   const [image, setImages] = useState(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchContestData = async () => {
//       try {
//         const result = await dispatch(getBehindScreen(id));
//         // console.log(result.data.data.judges, 'dddsdhdgd')
//         setJudges(result.data.data.judges);
//         setScore(result?.data?.data?.total_scores);
//         setImages(result?.data?.data?.files);
//         setData(result?.data?.data);

//         const filteredParticipants = result?.data?.data?.participants?.filter(
//           (participant) => participant.is_judged === 0
//         );
//         setParticipants(
//           filteredParticipants?.map((participant) => {
//             const fieldsValuesString = participant?.fields_values?.slice(1, -1);
//             const fieldsValues = JSON.parse(
//               fieldsValuesString.replace(/\\/g, "")
//             );
//             return { ...participant, ...fieldsValues };
//           })
//         );
//         setAllJudges(result?.data?.data?.participants);
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

//   useEffect(() => {
//     setParticipants(participants);
//   }, [participants]);

//   console.log(judges,'sdhdjd')

//   // const totalCount = scores?.length;
//   // if (totalCount === 0) return null;

//   console.log(image[0]?.file_url, "immm");


//   const defaultImage = "/bgimage.png";
//   const backgroundImage =
//     image?.length > 0 && image[0]?.file_url
//       ? `url(${image[0]?.file_url})`
//       : `url(${defaultImage})`;

//   const allTotal = data?.total_scores_by_participant;
//   const participantId = participants[0]?.id;
//   const totalScoress = allTotal[participantId];

//   const filteredScores = scores?.filter(score => (
//     score?.judge_id === judges?.id && score?.participant_id === participants[0]?.id
//   ));

//   // Calculate total score
//   let totalSingleScore = 0;
//   filteredScores?.forEach(score => {
//     totalSingleScore += score?.total_score;
//   });


//   return (
//     <>


//       <Box
//         sx={{
//           backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%), ${backgroundImage}`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           minHeight: "100vh",
//           width: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             minHeight: "90vh",
//             padding: "1rem 5%",
//           }}
//         >
//           <Grid container spacing={4} sx={{ alignItems: "start" }}>
//             <Grid item xs={12} sm={3} md={2.5}>
//               <Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     height: "35vh",
//                     backgroundColor: "#162f33",
//                     color: "white",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     sx={{ fontSize: "1rem", mt: "1rem" }}
//                   >
//                     {participants[0]?.id}
//                   </Typography>

//                   <Typography
//                     variant="h5"
//                     sx={{ fontSize: "1.3rem", fontWeight: 600 }}
//                   >
//                     Total Score : {totalScoress}
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontSize: "1rem",
//                       textAlign: "center",
//                       color: "white",
//                       backgroundColor: "#7c8385",
//                       width: "100%",
//                     }}
//                   >
//                     {participants[0]?.name}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={9} md={9.5}>
//               <Grid container spacing={2}>
//                 {/* {judges.map((judge, index) => {
//                     const participantScore = scores.find(score => score.participant_id === participants[0]?.id);
//                   return (
//                     <Grid item xs={12} sm={6} md={3} key={index}>
//                       <Card>
//                         <Box>
//                           <img src="/person.png" alt="image" width={"100%"} />
//                           <Typography
//                             variant="h6"
//                             sx={{
//                               fontSize: "1rem",
//                               textAlign: "center",
//                               backgroundColor: "#7c8385",
//                               color: "white",
//                             }}
//                           >
//                             {judge.name}
//                           </Typography>

//                           {scores.map((score, index) => (
//                             <Box
//                               key={index}
//                               sx={{
//                                 display: "flex",
//                                 padding: "0.2rem",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle1"
//                                 sx={{ fontSize: "0.9rem", fontWeight: 600 }}
//                               >
//                                 {score.field_name}
//                               </Typography>
//                               <Typography
//                                 variant="h5"
//                                 sx={{
//                                   fontSize: "0.9rem",
//                                   color: "red",
//                                   fontWeight: 600,
//                                 }}
//                               >
//                                 {score.total_score}
//                               </Typography>
//                             </Box>
//                           ))}

//                           <Box
//                             sx={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               backgroundColor: "#e0e0e0",
//                               padding: "0.3rem",
//                             }}
//                           >

//                             <Typography
//                               variant="h5"
//                               sx={{
//                                 fontSize: "0.9rem",
//                                 color: "red",
//                                 fontWeight: 600,
//                               }}
//                             >
//                              Total :  {totalScore}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   );
//                 })} */}

//                 {judges?.map((judge, index) => {
//                   const participantScore = scores?.find(
//                     (score) => score?.participant_id === participants[0]?.id
//                   );

//                   return (
//                     <Grid item xs={12} sm={6} md={3} key={index}>
//                       <Card>
//                         <Box>
//                           <img src="/person.png" alt="image" width={"100%"} />
//                           <Typography
//                             variant="h6"
//                             sx={{
//                               fontSize: "1rem",
//                               textAlign: "center",
//                               backgroundColor: "#7c8385",
//                               color: "white",
//                             }}
//                           >
//                             {judge?.name}
//                           </Typography>

//                           {participantScore ? (
//                             <Box>
//                               <Box>
//                                 {scores?.map((score, scoreIndex) => {
//                                   if (
//                                     score?.judge_id === judge?.id &&
//                                     score?.participant_id === participants[0]?.id
//                                   ) {
//                                     return (
//                                       <Box key={scoreIndex}>
//                                         <Box
//                                           sx={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                             padding: "0.2rem",
//                                           }}
//                                         >
//                                           <Typography
//                                             variant="subtitle1"
//                                             sx={{
//                                               fontSize: "0.9rem",
//                                               fontWeight: 600,
//                                             }}
//                                           >
//                                             {score?.field_name}
//                                           </Typography>
//                                           <Typography
//                                             variant="h5"
//                                             sx={{
//                                               fontSize: "0.9rem",
//                                               color: "red",
//                                               fontWeight: 600,
//                                             }}
//                                           >
//                                             {score?.total_score}
//                                           </Typography>
//                                         </Box>
//                                       </Box>
//                                     );
//                                   }
//                                   return null;
//                                 })}
//                               </Box>

//                               {/* <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "#e0e0e0",
//               padding: "0.3rem",
//             }}
//           >
//             <Typography
//               variant="h5"
//               sx={{
//                 fontSize: "0.9rem",
//                 color: "red",
//                 fontWeight: 600,
//               }}
//             >
//               Total: {totalSingleScore}
//             </Typography>
//           </Box> */}
//                             </Box>
//                           ) : (
//                             <Typography
//                               variant="body1"
//                               sx={{ textAlign: "center", padding: "0.5rem" }}
//                             >
//                               Waiting
//                             </Typography>
//                           )}
//                         </Box>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default PublicScreen;





import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  Card,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import {
  getBehindScreen,
  getStartContest,
  setNextParticipant,
} from "../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";

const PublicScreen = () => {
  const { id } = useParams();
  const [loadingbtn, setLoadingbtn] = useState(false);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [scores, setScore] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [allScoresGiven, setAllScoresGiven] = useState(false);
  const dispatch = useDispatch();
  const [allJudges, setAllJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [image, setImages] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {


    const fetchContestData = async () => {

      try {

        const result = await dispatch(getBehindScreen(id));
        // console.log(result.data.data.judges, 'dddsdhdgd')
        setJudges(result?.data?.data?.judges || []);
        setScore(result?.data?.data?.total_scores || []);
        setImages(result?.data?.data?.files || []);
        setData(result?.data?.data || {});

        const filteredParticipants = result?.data?.data?.participants?.filter(
          (participant) => participant?.is_judged === 0
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
        setAllJudges(result?.data?.data?.participants || []);
        setLoading(false);
      } catch (err) {
        console.log('jdhfsdjhf');
        setLoading(false); // End loading
      }
    };

    fetchContestData();

    const intervalId = setInterval(() => {
      fetchContestData();
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);

  useEffect(() => {
    setParticipants(participants);
  }, [participants]);

  console.log(participants,'sdhdjd')
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }





  const defaultImage = "/bgimage.png";
  const backgroundImage =
    image?.length > 0 && image[0]?.file_url
      ? `url(${image[0]?.file_url})`
      : `url(${defaultImage})`;

  const allTotal = data?.total_scores_by_participant;
  const participantId = participants[0]?.id;
  const totalScoress = allTotal[participantId];

  const filteredScores = scores?.filter(score => (
    score?.judge_id === judges?.id && score?.participant_id === participants[0]?.id
  ));

  // Calculate total score
  let totalSingleScore = 0;
  filteredScores?.forEach(score => {
    totalSingleScore += score?.total_score;
  });


  return (
    <>


      <Box
        sx={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%), ${backgroundImage}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            padding: "1rem 5%",
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: "start" }}>
            <Grid item xs={12} sm={3} md={2.5}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "35vh",
                    backgroundColor: "#162f33",
                    color: "white",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontSize: "1rem", mt: "1rem" }}
                  >
                    {participants[0]?.id}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontSize: "1.3rem", fontWeight: 600 }}
                  >
                    Total Score : {totalScoress}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "#7c8385",
                      width: "100%",
                    }}
                  >
                    {participants[0]?.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9} md={9.5}>
              <Grid container spacing={2}>
                {judges?.map((judge, index) => {
                  const participantScore = scores?.find(
                    (score) => score?.participant_id === participants[0]?.id
                  );

                  return (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card>
                        <Box>
                          <img src="/person.png" alt="image" width={"100%"} />
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1rem",
                              textAlign: "center",
                              backgroundColor: "#7c8385",
                              color: "white",
                            }}
                          >
                            {judge?.name}
                          </Typography>

                          {participantScore ? (
                            <Box>
                              <Box>
                                {scores?.map((score, scoreIndex) => {
                                  if (
                                    score?.judge_id === judge?.id &&
                                    score?.participant_id === participants[0]?.id
                                  ) {
                                    return (
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
                                            {score?.field_name}
                                          </Typography>
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              fontSize: "0.9rem",
                                              color: "red",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {score?.total_score}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    );
                                  }
                                  return null;
                                })}
                              </Box>

                              {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e0e0e0",
              padding: "0.3rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: "0.9rem",
                color: "red",
                fontWeight: 600,
              }}
            >
              Total: {totalSingleScore}
            </Typography>
          </Box> */}
                            </Box>
                          ) : (
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "center", padding: "0.5rem" }}
                            >
                              Waiting
                            </Typography>
                          )}
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </>
  );
};

export default PublicScreen;