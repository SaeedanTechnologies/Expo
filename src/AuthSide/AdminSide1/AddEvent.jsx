
// import React, { useState } from "react";
// import MyTextField from "../../page/components/MyTextField";
// import { Box, Typography, Snackbar, CircularProgress } from "@mui/material";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { addEvent } from "../../store/actions/adminActions";

// const AddEvent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [eventName, setEventName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleEventNameChange = (event) => {
//     setEventName(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!eventName.trim()) {
//       setError("Event Name is required");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found. Please log in.");
//       setSnackbarMessage("No authentication token found. Please log in.");
//       setSnackbarOpen(true);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await dispatch(addEvent({ name: eventName }));
//       localStorage.setItem("expo_id", response.data.payload.id);
//       console.log("expo_id", response.data.payload.id);
//       setSnackbarMessage("Event added successfully!");
//       setSnackbarOpen(true);
//       navigate("/admin/add-content");
//     } catch (error) {
//       console.error("Error:", error);
//       setSnackbarMessage("An error occurred. Please try again later.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "80vh",
//         padding: "1rem 10%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           width: "400px",
//           margin: "0 auto",
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "36px",
//             fontWeight: 700,
//             textAlign: "center",
//           }}
//         >
//           Add Event
//         </Typography>
//         <Typography
//           sx={{
//             color: "#949494",
//             fontSize: "16px",
//             fontWeight: 300,
//             textAlign: "center",
//           }}
//         >
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
//           consectetur lorem ipsum dolor sit amet.
//         </Typography>
//         <Box>
//           <MyTextField
//             label="Event Name"
//             placeholder="Please Write Convention Name"
//             value={eventName}
//             onChange={handleEventNameChange}
//             error={!!error}
//             helperText={error}
//           />
//         </Box>
//         <MyButton
//           onClick={handleSubmit}
//           text={loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Next"}
//           disabled={loading}
//         />
//       </Box>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };

// export default AddEvent;





// import React, { useState, useEffect } from "react";
// import MyTextField from "../../page/components/MyTextField";
// import { Box, Typography, Snackbar, CircularProgress, IconButton } from "@mui/material";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { addEvent, editEvent, getEvent } from "../../store/actions/adminActions";
// import EditIcon from "@mui/icons-material/Edit";

// const AddEvent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [eventName, setEventName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventId, setEventId] = useState(null);
//   console.log(eventName, "eventvalue")
//   useEffect(() => {
//     // When entering edit mode, set the initial state
//     if (isEditing && eventId) {
//       fetchEventDetails(eventId);
//     } else {
//       setEventName(""); // Reset eventName if not editing or no eventId is set
//     }
//   }, [isEditing, eventId]);

//   const fetchEventDetails = async (eventId) => {
//     try {
//       setLoading(true);
//       const response = await dispatch(getEvent(eventId));
//       console.log(response.data.payload.name,"OPPPPP")
//       const { name } = response.data.payload.name; // Add more fields as needed
//       setEventName(response.data.payload.name);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       setSnackbarMessage("Failed to fetch event details.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEventNameChange = (event) => {
//     setEventName(event.target.value);
//   };

//   const handleEditClick = async () => {
//     setIsEditing(true);
//     setEventName(""); // Clear eventName first
//     try {
//       // Fetch event details based on eventId
//       if (eventId) {
//         await fetchEventDetails(eventId);
//       }
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       setSnackbarMessage("Failed to fetch event details.");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!eventName.trim()) {
//       setError("Event Name is required");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found. Please log in.");
//       setSnackbarMessage("No authentication token found. Please log in.");
//       setSnackbarOpen(true);
//       return;
//     }

//     try {
//       setLoading(true);
//       let response;
//       if (isEditing) {
//         response = await dispatch(editEvent(eventId, { name: eventName }));
//         setSnackbarMessage("Event updated successfully!");
//       } else {
//         response = await dispatch(addEvent({ name: eventName }));
//         setEventId(response.data.payload.id);
//         localStorage.setItem("expo_id", response.data.payload.id);
//         setSnackbarMessage("Event added successfully!");
//       }
//       setSnackbarOpen(true);
//       // Navigate once after operation completes
//       navigate("/admin/add-content");
//     } catch (error) {
//       console.error("Error:", error);
//       setSnackbarMessage("An error occurred. Please try again later.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "80vh",
//         padding: "1rem 10%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           width: "400px",
//           margin: "0 auto",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography
//             sx={{
//               fontSize: "36px",
//               fontWeight: 700,
//               textAlign: "center",
//             }}
//           >
//             {isEditing ? "Edit Event" : "Add Event"}
//           </Typography>
//           <IconButton onClick={handleEditClick}>
//             <EditIcon />
//           </IconButton>
//         </Box>
//         <Typography
//           sx={{
//             color: "#949494",
//             fontSize: "16px",
//             fontWeight: 300,
//             textAlign: "center",
//           }}
//         >
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
//         </Typography>

//         <MyTextField
//           label="Event Name"
//           placeholder="Please Write Convention Name"
//           value={eventName}
//           onChange={handleEventNameChange}
//           error={!!error}
//           helperText={error}
//         />

//         <MyButton
//           onClick={handleSubmit}
//           text={loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : isEditing ? "Save" : "Next"}
//           disabled={loading}
//         />
//       </Box>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };

// export default AddEvent;

// import React, { useState, useEffect } from "react";
// import MyTextField from "../../page/components/MyTextField";
// import { Box, Typography, Snackbar, CircularProgress, IconButton } from "@mui/material";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { addEvent, editEvent, getEvent } from "../../store/actions/adminActions";
// import EditIcon from "@mui/icons-material/Edit";

// const AddEvent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const eventDetails = useSelector(state => state.admin.eventDetails); // Assuming your Redux state structure
//   const [eventName, setEventName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventId, setEventId] = useState(null);

//   useEffect(() => {
//     // When entering edit mode, set the initial state
//     if (isEditing && eventId) {
//       fetchEventDetails(eventId);
//     } else {
//       setEventName(""); // Reset eventName if not editing or no eventId is set
//     }
//   }, [isEditing, eventId]);

//   useEffect(() => {
//     // Store event details in state
//     if (eventDetails) {
//       setEventName(eventDetails.name);
//       // Add more fields as needed
//     }
//   }, [eventDetails]);

//   const fetchEventDetails = async (eventId) => {
//     try {
//       setLoading(true);
//       const response = await dispatch(getEvent(eventId));
//       setEventId(eventId);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       setSnackbarMessage("Failed to fetch event details.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEventNameChange = (event) => {
//     setEventName(event.target.value);
//   };

//   const handleEditClick = async () => {
//     setIsEditing(true);
//     setEventName(""); // Clear eventName first
//     try {
//       // Fetch event details based on eventId
//       if (eventId) {
//         await fetchEventDetails(eventId);
//       }
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       setSnackbarMessage("Failed to fetch event details.");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!eventName.trim()) {
//       setError("Event Name is required");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found. Please log in.");
//       setSnackbarMessage("No authentication token found. Please log in.");
//       setSnackbarOpen(true);
//       return;
//     }

//     try {
//       setLoading(true);
//       let response;
//       if (isEditing) {
//         response = await dispatch(editEvent(eventId, { name: eventName }));
//         setSnackbarMessage("Event updated successfully!");
//       } else {
//         response = await dispatch(addEvent({ name: eventName }));
//         setEventId(response.data.payload.id);
//         localStorage.setItem("expo_id", response.data.payload.id);
//         setSnackbarMessage("Event added successfully!");
//       }
//       setSnackbarOpen(true);
//       // Navigate once after operation completes
//      // navigate("/admin/add-content");
//     } catch (error) {
//       console.error("Error:", error);
//       setSnackbarMessage("An error occurred. Please try again later.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "80vh",
//         padding: "1rem 10%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           width: "400px",
//           margin: "0 auto",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography
//             sx={{
//               fontSize: "36px",
//               fontWeight: 700,
//               textAlign: "center",
//             }}
//           >
//             {isEditing ? "Edit Event" : "Add Event"}
//           </Typography>
//           <IconButton onClick={handleEditClick}>
//             <EditIcon />
//           </IconButton>
//         </Box>
//         <Typography
//           sx={{
//             color: "#949494",
//             fontSize: "16px",
//             fontWeight: 300,
//             textAlign: "center",
//           }}
//         >
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
//         </Typography>

//         <MyTextField
//           label="Event Name"
//           placeholder="Please Write Convention Name"
//           value={eventName}
//           onChange={handleEventNameChange}
//           error={!!error}
//           helperText={error}
//         />

//         <MyButton
//           onClick={handleSubmit}
//           text={loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : isEditing ? "Save" : "Next"}
//           disabled={loading}
//         />
//       </Box>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };

// export default AddEvent;
