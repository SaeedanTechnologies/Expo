import React from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Positions from "../../page/components/Positions";
import TelegramIcon from '@mui/icons-material/Telegram';

const records = [
  { position: 1, name: "Hamza", score: 47, avatar: "avatar1.png", color: "#f44336" },
  { position: 2, name: "Ruhan", score: 48, avatar: "avatar2.png", color: "#ff9800" },
  { position: 3, name: "Sheeda", score: 49, avatar: "avatar3.png", color: "#4caf50" },
  { position: 4, name: "Hamza", score: 47, avatar: "avatar1.png", color: "#2196f3" },
  { position: 5, name: "Ruhan", score: 48, avatar: "avatar2.png", color: "#9c27b0" },
  { position: 6, name: "Sheeda", score: 49, avatar: "avatar3.png", color: "#e91e63" },
  { position: 7, name: "Ruhan", score: 48, avatar: "avatar2.png", color: "#3f51b5" },
  { position: 8, name: "Sheeda", score: 49, avatar: "avatar3.png", color: "#00bcd4" },
];

const AllRecords = () => {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme. breakpoints.down('sm'))


  return (
    <Box sx={{ padding: isSmall ? '2rem 10%': '2rem 30%'}}>
      <Typography variant="h4" align="center" gutterBottom>
        All Records
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
        consectetur lorem ipsum dolor sit amet.
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{backgroundColor:'#f3f6f9'}}>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Participant Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.position}>
                <TableCell>
            <Positions number={record.position} color={record.color} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={record.avatar}
                      alt={record.name}
                      sx={{ marginRight: 2 }}
                    />
                    {record.name}
                  </Box>
                </TableCell>
                <TableCell>{record.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }} gap={2}>
        <Button variant="contained" sx={{color:'black', fontWeight:600, textTransform:'none', backgroundColor:'#dc9092', width:'100%'}}>
        <TelegramIcon/>  Send To Organizer
        </Button>
        <Button variant="contained" sx={{width:'100%', textTransform:'none'}} >
          Show On Public Screen
        </Button>
      </Box>
    </Box>
  );
};

export default AllRecords;
