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
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import {
  getStartContest,
  setNextParticipant,
} from "../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";



const StyledAvatar = styled(Avatar)(({ theme, isCurrent }) => ({
  width: 60,
  height: 60,
  border: `4px solid ${isCurrent ? "green" : "red"}`,
  margin: theme.spacing(1),
}));

const AdminOperator = () => {
const {id} = useParams()

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const dispatch = useDispatch();

  const handleClick = async (id, contestId) => {
    try {
      const res = await dispatch(setNextParticipant(contestId, id));
      console.log("success", res);
    } catch (error) {
      console.error("Failed to send help request:", error);
    }
  };

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const result = await dispatch(getStartContest(id));
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
  }, [dispatch]);

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
            <TableBody>
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
            <Box key={index} sx={{ textAlign: "center" }}>
              <StyledAvatar
                src={judge?.image}
                alt={judge?.name}
                isCurrent={judge?.isCurrent}
              />
              <Typography sx={{ fontWeight: 600 }}>{judge?.name}</Typography>
              {judge?.score && (
                <Typography sx={{ color: "green", fontSize: "0.8rem" }}>
                  Score {judge?.score}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
        <br />
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            justifyContent: "space-between",
            padding: 2,
            // backgroundColor: '#f1f1f1',
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
            sx={{ textTransform: "none" }}
          >
            Now Judge {participants[0]?.name}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminOperator;
