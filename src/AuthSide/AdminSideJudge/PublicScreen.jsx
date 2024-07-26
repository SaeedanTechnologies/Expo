import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  Card,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  getBehindScreen,
  getStartContest,
  setNextParticipant,
} from "../../store/actions/contestStartActions";

import AdminSideScreen2 from "./AdminSideScreen/AdminSideScreen2";

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
  const [voted, setVoted] = useState([]);
  const [participantScore, setParticipantScore] = useState([]);

console.log(voted, 'dddddddddddddddddddd')

  const [publicScreenValue, setPublicScreenValue] = useState("");
  const [status, setStatus] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isOk, setIsOk] = useState(false);

  console.log(isPublished, "status code");

  useEffect(() => {
    const storedValue = localStorage.getItem("public-screen");
    console.log(storedValue, "storedValue");
    if (storedValue) {
      setPublicScreenValue(storedValue);
    }
  }, []);





  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getBehindScreen(id));

        // console.log(result.data.data.total_scores_by_participant, "dddsdhdgd");
setVoted(result.data.data.scores_by_judge)
setParticipantScore(result.data.data.total_scores_by_participant)

        setIsPublished(result?.data?.data?.status || false);
        setJudges(result?.data?.data?.judges || []);
        setScore(result?.data?.data?.total_scores || []);
        setImages(result?.data?.data?.files || []);
        setData(result?.data?.data || {});
        setStatus(result?.data.status);
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
        console.log("jdhfsdjhf");
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

  console.log(participants)

  // console.log(participants, "sdhdjd");
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
  const backgroundMedia =
    image?.length > 0 && image[0]?.file_url ? image[0]?.file_url : defaultImage;
  const isVideo = backgroundMedia && backgroundMedia.endsWith(".mp4");



  const allTotal = data?.total_scores_by_participant;
  const participantId = participants[0]?.id;
  const totalScoress = allTotal[participantId];

  const filteredScores = scores?.filter(
    (score) =>
      score?.judge_id === judges?.id &&
      score?.participant_id === participants[0]?.id
  );

  // Calculate total score
  let totalSingleScore = 0;
  filteredScores?.forEach((score) => {
    totalSingleScore += score?.total_score;
  });


  return (
    <>
      {status ? (
        <AdminSideScreen2 />
      ) : (
        <Box
          sx={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
            >
              <source src={backgroundMedia} type="video/mp4" />
            </video>
          ) : (
            <Box
              sx={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%), url(${backgroundMedia})`,

                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: '100%',
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            />
          )}

          {isPublished ? (
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
                        {participants[0]?.sequential_id}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.2rem",
                          textAlign: "center",
                          color: "white",

                          width: "100%",
                        }}
                      >
                       Name : {participants[0]?.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontSize: "1.3rem", fontWeight: 600 }}
                      >
                        Total Score : {totalScoress?.toFixed(2)}
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
                          <Card sx={{

border: `4px solid ${
     scores.some(
      (s) =>
     s.judge_id === judge.id &&
        s.participant_id === allJudges[0]?.id

    )
        ? "green"
        : "red"
    }`
                          }}>
                            <Box>
                              <img
                                src={judge?.profile_picture}
                                alt="image"
                                width={"100%"}
                                height={"200rem"}
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "top"

                                }}
                              />
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
                                  {scores
                                    ?.filter(
                                      (score) =>
                                        score?.judge_id === judge?.id &&
                                        score?.participant_id ===
                                          participants[0]?.id
                                    )
                                    .map((score, scoreIndex) => (
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
                                              color: "black",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {score?.total_score.toFixed(2)}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    ))}
                                  <Divider />
                                  {/* Subtotal section */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "0.2rem",
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
                                      Total
                                    </Typography>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        fontSize: "0.9rem",
                                        color: "red",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {scores
                                        .filter(
                                          (score) =>
                                            score?.judge_id === judge?.id &&
                                            score?.participant_id ===
                                              participants[0]?.id
                                        )
                                        .reduce(
                                          (total, score) =>
                                            total +
                                            parseFloat(score?.total_score || 0),
                                          0
                                        )
                                        .toFixed(2)}
                                      {/* Apply .toFixed(2) to format to 2 decimal places */}
                                    </Typography>
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  variant="body1"
                                  sx={{
                                    textAlign: "center",
                                    padding: "0.5rem",
                                  }}
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
          ) : (
            <>
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
                          {participants[0]?.sequential_id}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.2rem",
                            textAlign: "center",
                            color: "white",
                           
                            width: "100%",
                          }}
                        >
                        Name :  {participants[0]?.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontSize: "1.3rem", fontWeight: 600 }}
                        >
                          Total Score :
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1rem",
                            textAlign: "center",
                            color: "white",
                            // backgroundColor: "#7c8385",
                            width: "100%",
                          }}
                        >

                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={9} md={9.5}>
                    <Grid container spacing={2}>
                      {judges?.map((judge, index) => {


                        const participantScore = scores?.find(
                          (score) =>
                            score?.participant_id === participants[0]?.id
                        );

                        return (
                          <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card sx={{border: `4px solid ${
     scores.some(
      (s) =>
     s.judge_id === judge.id &&
        s.participant_id === allJudges[0]?.id

    )
        ? "green"
        : "red"
    }`,}}>

                              <Box>
                                <img
                                  src={judge?.profile_picture}
                                  alt="image"
                                  width={"100%"}
                                  height={"200rem"}
                                  style={{
                                    objectFit: "cover",
                                     objectPosition: "top"

                                  }}
                                />
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
                                {scores.some(
      (s) =>
        s.judge_id === judge.id &&
        s.participant_id === allJudges[0]?.id

    ) ? ( // Checking if judge_id matches voted_id
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            padding: "0.5rem",
            color: "green", // Example styling for the text
            fontWeight: "bold", // Example styling for the text
          }}
        >
          Voted
        </Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            padding: "0.5rem",
          }}
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
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default PublicScreen;
