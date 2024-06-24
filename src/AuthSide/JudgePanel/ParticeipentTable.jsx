import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Avatar,
  Button,
  Typography,
} from "@mui/material";

const ParticeipentTable = ({ data }) => {
  return (
    <Box
      sx={{
        padding: "0rem",
        minHeight: "20vh",
        width: { xs: "280px", md: "100%" },
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            {data.map((participant, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src=""
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                    />
                    <Typography sx={{ padding: "12px" }}>{participant.name}</Typography>
                  </Box>
                  <Button sx={{color:"#6C9200", fontSize:{xs:'11px', md:'17px'}}}>Now In Progress</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticeipentTable;
