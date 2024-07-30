import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Typography, Grid } from "@mui/material";
import {
  getBehindScreenResults,
  getBehindScreen,
} from "../../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ShieldIcon from "@mui/icons-material/Shield";

const AdminSideScreen2 = () => {
  const { id } = useParams();
  const [contestResults, setContestResults] = useState([]);
  const dispatch = useDispatch();
  const [image, setImages] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getBehindScreenResults(id));
        setContestResults(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBehindScreenData = async () => {
      try {
        const result = await dispatch(getBehindScreen(id));
        setImages(result?.data?.data?.files || []);
        setData(result?.data?.data || {});
        setStatus(result?.data.status);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchContestData();
    fetchBehindScreenData();

    const intervalId = setInterval(() => {
      fetchBehindScreenData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  const parseFieldsValues = (fieldsValues) => {
    try {
      const cleanedValues = fieldsValues
        .replace(/^"|"$/g, "")
        .replace(/\\"/g, '"');
      const parsedValues = JSON.parse(cleanedValues);
      return parsedValues.name;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "";
    }
  };

  const defaultImage = "/bgimage.png";
  const backgroundMedia =
    image?.length > 0 && image[0]?.file_url ? image[0]?.file_url : defaultImage;
  const isVideo = backgroundMedia && backgroundMedia.endsWith(".mp4");

  return (
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
            minHeight: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "5px", md: "7px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontFamily: "Roboto",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 800,
              lineHeight: "36px",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Results
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto",
              fontSize: { xs: "16px", md: "20px" },
              fontWeight: "400",
              lineHeight: "28px",
              textAlign: "center",
              marginBottom: "2rem",
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
            sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>

          <Box sx={{ marginBottom: "20px", position: "relative" }}>
            {/* 1st Position Image */}
            {contestResults.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                {/* <Avatar src={contestResults[0].participant.fields_values.Upload} alt={parseFieldsValues(contestResults[0].participant.fields_values)} style={{ width: '100px', height: '100px', marginBottom: '10px' }} /> */}

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <ShieldIcon sx={{ color: "green", fontSize: 60 }} />
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Typography>
                </Box>


                <Typography
                  variant="body1"
                  sx={{ fontSize: "2rem", color: "white", textAlign: "center" }}
                >
                  {parseFieldsValues(
                    contestResults[0].participant.fields_values
                  )}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "166px",
              marginBottom: "3px",
              marginTop: "60px",
            }}
          >
            {/* 2nd and 3rd Position Images */}

            {contestResults.slice(1, 3).map((result, index) => (
              <Box
                key={result.participant_id}
                sx={{
                  mt: 6,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/*
    <Avatar src={result.participant.fields_values.Upload} alt={parseFieldsValues(result.participant.fields_values)} style={{ width: '70px', height: '70px', marginBottom: '10px' }} /> */}

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <ShieldIcon
                    sx={{ color: index === 0 ? "red" : "grey", fontSize: 60 }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {index === 0 ? "2" : "3"}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  {parseFieldsValues(result.participant.fields_values)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Render positions 4-6 in a horizontal layout */}
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: "#333",
              width: "80%",
              marginTop: "20px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {contestResults?.slice(3, 6)?.map((result) => (
              <Grid
                item
                key={result.participant_id}
                xs={12}
                md={4}
                sx={{ textAlign: "center" }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "white", paddingBottom: "12px" }}
                >
                  {parseFieldsValues(result.participant.fields_values)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminSideScreen2;
