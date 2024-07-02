import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import MyTextField from "../../page/components/MyTextField";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import MyButton from "../../page/components/MyButton";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getFormFields } from "../../store/actions/authActions";
import { Snackbar, CircularProgress } from "@mui/material";
const SignUpForm = () => {


  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const end_date_time = localStorage.getItem("end_date_time");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getFormFields(id))
      .then((result) => {
        setData(result.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch, id]);

  const onSubmit = (formData) => {
    setSubmitting(true);
    const payload = {
        contest_id: id,
        fields_values: JSON.stringify(formData)
    };

    axios.post('https://expoproject.saeedantechpvt.com/api/participients', payload)
        .then(response => {

            setSnackbarMessage('You are Registered ');
            navigate("/participant-registered");
            setSubmitting(false);
        })
        .catch(error => {
            if (error.response) {

                console.error('message', error.response.data.message);
                setSnackbarMessage(error.response.data.message);
            } else if (error.request) {

                console.error('Error:', error.request);
                setSnackbarMessage('No response received from the server.');
            } else {

                console.error('Error:', error.message);
                setSnackbarMessage(error.message);
            }
            setSnackbarOpen(true);
        }).finally(() => {
          setSubmitting(false); // Stop loading indicator regardless of success/error
        });
};

const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
};


  const compareEndDateTime = () => {
    const currentDateTime = new Date();
    const endDateTime = new Date(end_date_time);

    return currentDateTime <= endDateTime;
  };

  // if (!compareEndDateTime()) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         padding: "1rem 10%",
  //         height: "100vh",
  //       }}
  //     >
  //       <Typography
  //         sx={{
  //           fontSize: "24px",
  //           fontWeight: 700,
  //           textAlign: "center",
  //           color: "red",
  //         }}
  //       >
  //         The registration period has ended.
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 10%",
        height: isSmall ? "80vh" : "100vh",
      }}
    >

{loading ? (
        <CircularProgress />
      ) : (

<>

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
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Sign Up As a Participant
        </Typography>
        <Typography
          sx={{
            color: "#949494",
            fontSize: "16px",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {data &&
            data.map((field) => (
              <Controller
                key={field.id}
                name={field.label}
                control={control}
                defaultValue=""
                rules={{
                  required: `${field.label} is required`,
                  pattern: {
                    value: field.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : undefined,
                    message: `Invalid ${field.label}`,
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
          {/* <MyButton type="submit" text="Submit" /> */}

          <MyButton type="submit" text="Submit" disabled={submitting}  />


        </form>


      </Box>


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



