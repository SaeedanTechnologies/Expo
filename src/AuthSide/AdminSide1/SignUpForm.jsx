// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import axios from 'axios';
// import MyTextField from "../../page/components/MyTextField";
// import { Box, Typography, useMediaQuery, useTheme, CircularProgress, Snackbar } from "@mui/material";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch } from "react-redux";
// import { getFormFields } from "../../store/actions/authActions";
// import { singleContest } from "../../store/actions/contestStartActions";

// const SignUpForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [endDateTime, setEndDateTime] = useState(null);
//   const [timeDiff, setTimeDiff] = useState({ hours: 0, minutes: 0, seconds: 0 });
//   const [registrationEnded, setRegistrationEnded] = useState(false);
//   const { handleSubmit, control, formState: { errors } } = useForm();
//   const [registrationExpired, setRegistrationExpired] = useState(false);

//   useEffect(() => {
//     dispatch(singleContest(id))
//       .then((result) => {
//         const maxparticipant = result.data.payload.max_contestent
//         const registeredParticipant = result.data.payload.participient

//         const endDateTime = new Date(result.data.payload.end_date_time);
//         setEndDateTime(endDateTime);
//         setLoading(false);
//         if (maxparticipant == registeredParticipant.length) {
//           setRegistrationExpired(true);
//         }

//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });

//     dispatch(getFormFields(id))
//       .then((result) => {
//         setData(result.data.payload);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [dispatch, id]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (endDateTime) {
//         const currentDateTime = new Date();
//         const diffMillis = endDateTime - currentDateTime;
//         if (diffMillis > 0) {
//           const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));
//           const diffMinutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60));
//           const diffSeconds = Math.floor((diffMillis % (1000 * 60)) / 1000);
//           setTimeDiff({ hours: diffHours, minutes: diffMinutes, seconds: diffSeconds });
//         } else {
//           clearInterval(interval);
//           setRegistrationEnded(true);

//         }
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [endDateTime]);

//   const onSubmit = (formData) => {
//     setSubmitting(true);
//     const payload = {
//       contest_id: id,
//       fields_values: JSON.stringify(formData)
//     };

//     axios.post('https://expoproject.saeedantechpvt.com/api/participients', payload)
//       .then(response => {
//         setSnackbarMessage('You are Registered ');
//         navigate("/participant-registered");
//       })
//       .catch(error => {
//         if (error.response) {
//           console.error('message', error.response.data.message);
//           setSnackbarMessage(error.response.data.message);
//         } else if (error.request) {
//           console.error('Error:', error.request);
//           setSnackbarMessage('No response received from the server.');
//         } else {
//           console.error('Error:', error.message);
//           setSnackbarMessage(error.message);
//         }
//         setSnackbarOpen(true);
//       }).finally(() => {
//         setSubmitting(false);
//       });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "1rem 10%",
//         minHeight: isSmall ? "80vh" : "80vh",
//       }}
//     >
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>

//          { registrationExpired ? (
// <>
// <Box sx={{displa:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>

// <Box>
//   <img src="/mainLogo.png" alt="expo"/>
// </Box>

// <br/>

// <Typography sx={{fontWeight:600, textAlign:'center', fontSize:'2rem'}}>Registration Closed</Typography>
// </Box>

// </>

//          ):(
// <>
// {registrationEnded ? (
//   <Box sx={{displa:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>

// <Box>
//   <img src="/mainLogo.png" alt="expo"/>
// </Box>

// <br/>

// <Typography sx={{fontWeight:600, textAlign:'center', fontSize:'2rem'}}>Registration Time has been ended</Typography>
// </Box>
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "20px",
//                 justifyContent: "center",
//                 width: "400px",
//                 margin: "0 auto",
//               }}
//             >
//               {endDateTime && (
//                 <Box
//                   sx={{
//                     marginTop: "20px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontSize: "1.2rem", fontWeight: 600 }}
//                   >
//                     Registration Ends in:
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#ff4500" }}
//                   >
//                     {`${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`}
//                   </Typography>
//                 </Box>
//               )}

//               <Typography
//                 sx={{
//                   fontSize: "2rem",
//                   fontWeight: 700,
//                   textAlign: "center",
//                 }}
//               >
//                 Sign Up As a Participant
//               </Typography>
//               {!registrationEnded && data  && (
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   {data.map((field) => (
//                     <Controller
//                       key={field.id}
//                       name={field.label}
//                       control={control}
//                       defaultValue=""
//                       rules={{
//                         required: `${field.label} is required`,
//                         pattern: {
//                           value: field.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : undefined,
//                           message: `Invalid ${field.label}`,
//                         },
//                       }}
//                       render={({ field: { onChange, value } }) => (
//                         <MyTextField
//                           label={field.label}
//                           placeholder={`Enter Your ${field.label}`}
//                           type={field.type}
//                           value={value}
//                           onChange={onChange}
//                           error={!!errors[field.label]}
//                           helperText={errors[field.label]?.message}
//                         />
//                       )}
//                     />
//                   ))}

//                   {/* <MyButton type="submit" text="Submit" disabled={submitting} /> */}
//                   <MyButton
//     type="submit"
//     text={submitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
//     disabled={submitting}
// />

//                 </form>
//               )}
//             </Box>
//           )}

// </>
//          )

//          }

//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={6000}
//             onClose={handleCloseSnackbar}
//             message={snackbarMessage}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default SignUpForm;

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import MyTextField from "../../page/components/MyTextField";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MyButton from "../../page/components/MyButton";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getFormFields } from "../../store/actions/authActions";
import { singleContest } from "../../store/actions/contestStartActions";

const SignUpForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [registrationNotStarted, setRegistrationNotStarted] = useState(true);
  const [startDateTime, setStartDateTime] = useState(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [endDateTime, setEndDateTime] = useState(null);
  const [timeDiff, setTimeDiff] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [registrationEnded, setRegistrationEnded] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [registrationExpired, setRegistrationExpired] = useState(false);

  useEffect(() => {
    dispatch(singleContest(id))
      .then((result) => {
        const maxparticipant = result.data.payload.max_contestent;
        const registeredParticipant = result.data.payload.participient;
        const startDateTime = new Date(result.data.payload.start_date_time);
        const endDateTime = new Date(result.data.payload.end_date_time);
        setStartDateTime(startDateTime);
        setEndDateTime(endDateTime);
        setLoading(false);
        if (maxparticipant == registeredParticipant.length) {
          setRegistrationExpired(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    dispatch(getFormFields(id))
      .then((result) => {
        setData(result.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (endDateTime) {
        const currentDateTime = new Date();
        const diffMillis = endDateTime - currentDateTime;
        if (diffMillis > 0) {
          const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));
          const diffMinutes = Math.floor(
            (diffMillis % (1000 * 60 * 60)) / (1000 * 60)
          );
          const diffSeconds = Math.floor((diffMillis % (1000 * 60)) / 1000);
          setTimeDiff({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds,
          });
        } else {
          clearInterval(interval);
          setRegistrationEnded(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDateTime]);

  const onSubmit = (formData) => {
    setSubmitting(true);
    const payload = {
      contest_id: id,
      fields_values: JSON.stringify(formData),
    };

    axios
      .post("https://expoproject.saeedantechpvt.com/api/participients", payload)
      .then((response) => {
        setSnackbarMessage("You are Registered ");
        navigate("/participant-registered");
      })
      .catch((error) => {
        if (error.response) {
          console.error("message", error.response.data.message);
          setSnackbarMessage(error.response.data.message);
        } else if (error.request) {
          console.error("Error:", error.request);
          setSnackbarMessage("No response received from the server.");
        } else {
          console.error("Error:", error.message);
          setSnackbarMessage(error.message);
        }
        setSnackbarOpen(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      if (startDateTime) {
        const currentDateTime = new Date();
        if (currentDateTime >= startDateTime) {
          setRegistrationNotStarted(false);
        }
      }

      if (endDateTime) {
        const currentDateTime = new Date();
        const diffMillis = endDateTime - currentDateTime;
        if (diffMillis > 0) {
          const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));
          const diffMinutes = Math.floor(
            (diffMillis % (1000 * 60 * 60)) / (1000 * 60)
          );
          const diffSeconds = Math.floor((diffMillis % (1000 * 60)) / 1000);
          setTimeDiff({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds,
          });
        } else {
          clearInterval(interval);
          setRegistrationEnded(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateTime, endDateTime]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 10%",
        minHeight: isSmall ? "80vh" : "80vh",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {registrationExpired ? (
            <>
              <Box
                sx={{
                  displa: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <img src="/mainLogo.png" alt="expo" />
                </Box>

                <br />

                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: "2rem",
                  }}
                >
                  Registration Closed
                </Typography>
              </Box>
            </>
          ) : registrationNotStarted ? (
            <Box
              sx={{
                displa: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box>
                <img src="/mainLogo.png" alt="expo" />
              </Box>

              <br />

              <Typography
                sx={{ fontWeight: 600, textAlign: "center", fontSize: "2rem" }}
              >
                Registration is not Started yet
              </Typography>
            </Box>
          ) : (
            <>
              {registrationEnded ? (
                <Box
                  sx={{
                    displa: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <img src="/mainLogo.png" alt="expo" />
                  </Box>

                  <br />

                  <Typography
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      fontSize: "2rem",
                    }}
                  >
                    Registration Time has been ended
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "center",
                    width: "400px",
                    margin: "0 auto",
                  }}
                >
                  {endDateTime && (
                    <Box
                      sx={{
                        marginTop: "20px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "1.2rem", fontWeight: 600 }}
                      >
                        Registration Ends in:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: "#ff4500",
                        }}
                      >
                        {`${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`}
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Sign Up As a Participant
                  </Typography>
                  {!registrationEnded && data && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {data.map((field) => (
                        <Controller
                          key={field.id}
                          name={field.label}
                          control={control}
                          defaultValue=""
                          rules={{
                            required: `${field.label} is required`,
                            pattern: {
                              value:
                                field.type === "email"
                                  ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                  : undefined,
                              message: `Please Enter valid ${field.label}`,
                            },
                          }}
                          render={({ field: { onChange, value } }) => (
                            <MyTextField
                              label={field.label}
                              placeholder={`Enter Your ${field.label}`}
                              type={field.type}
                              value={value}
                              onChange={onChange}
                              error={!!errors[field.label]}
                              helperText={errors[field.label]?.message}
                            />
                          )}
                        />
                      ))}

                      {/* <MyButton type="submit" text="Submit" disabled={submitting} /> */}
                      <MyButton
                        type="submit"
                        text={
                          submitting ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Submit"
                          )
                        }
                        disabled={submitting}
                      />
                    </form>
                  )}
                </Box>
              )}
            </>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </>
      )}
    </Box>
  );
};

export default SignUpForm;
