import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import ParticeipentTable from "./ParticeipentTable";
import imgfrm1 from "../../assets/adim-screen/imagfram1.png";
import imgfrm2 from "../../assets/adim-screen/imagfram2.png";
import imgfrm3 from "../../assets/adim-screen/imagfram1.png";

const JudgeAllParticepent = () => {
  const data = [
    { position: 1, img: imgfrm1, name: 'Humza', score: 95 },
  
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: { xs: "12px", md: "24px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontFamily: "Roboto",
              fontSize: { xs: "24px", md: "46px" },
              fontWeight: 800,
              lineHeight: "1.2",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
          All Participants
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto",
              fontSize: { xs: "16px", md: "20px" },
              fontWeight: 400,
              lineHeight: "1.4",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#949494",
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor 
            sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>

          <Box sx={{ width: "100%" , background:'#F3F6F9', paddingTop:'17px', paddingLeft:'12px', paddingRight:'12px', display:{xs:'contents', md:'block'}}}>
            <Box sx={{ marginBottom: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      letterSpacing: "0.25px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    Participant Name
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      letterSpacing: "0.25px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    Judge 1 Score
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      letterSpacing: "0.25px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    Judge 3 Score
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      letterSpacing: "0.25px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    Judge 4 Score
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      letterSpacing: "0.25px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    Judge 4 Score
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <ParticeipentTable data={data} />
        </Box>
      </Container>
    </Box>
  );
};

export default JudgeAllParticepent;
