import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import PushBack from "../../components/PushBack/PushBack";

const ItemTypes = {
  BUTTON: "button",
};

const DraggableButton = () => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BUTTON,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box>
      <Button
        ref={drag}
        sx={{ textTransform: "none", opacity: isDragging ? 0.5 : 1 }}
        variant="outlined"
        color="primary"
      >
        Role
      </Button>
      <Typography sx={{ fontSize: "11px", fontWeight: 600, marginTop: "12px" }}>
        Please Drag and Drop Left to right
      </Typography>
    </Box>
  );
};

const DropArea = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BUTTON,
    drop: () => {
      onDrop();
    },
  });

  return (
    <Box ref={drop} sx={{ minHeight: "200px", padding: "1rem" }}>
      {children}
    </Box>
  );
};

const CreateScoreCard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { judges } = location.state || { judges: [] };
  const judge_ids_R = useSelector((state) => state.stepper.judge_ids);
  const names = judges.map((judge) => judge.judge_name);
  const profile = judges.map((judge) => judge.profile_picture);
  const dispatch = useDispatch();
  const txt_fields = useSelector((state) => state.stepper.text_fields);
  // console.log(txt_fields, "YE TEXT  FIELDS");
  const [textFields, setTextFields] = useState([
    { name: "", label: "", type: "text", value: "", required: true },
  ]);
  // console.log(textFields, "textFileds");
  useEffect(() => {
    if (txt_fields) {
      setTextFields(txt_fields);
    }
  }, []);
  const token = localStorage.getItem("token");
  // const contest_id = localStorage.getItem("add_register_response");
  const contest_id = useSelector((state) => state.stepper.cont_id);
  const { enqueueSnackbar } = useSnackbar();
  const handleDrop = () => {
    setTextFields([
      ...textFields,
      { name: "", label: "", type: "text", value: "", required: true },
    ]);
  };

  const handleTextFieldChange = (index, field, value) => {
    const newTextFields = [...textFields];
    newTextFields[index][field] = value;
    setTextFields(newTextFields);
  };
  // console.log(textFields);
  const navigate = useNavigate();

  // const handleSubmit = () => {
  //   const payload = {
  //     contest_id: contest_id,
  //     judge_name: names,
  //     link: `https://frontend.saeedantechpvt.com/admin-login`,
  //     email: judges.map((judge) => judge.email),
  //     profile_picture: profile,
  //     fields: textFields.map((field, index) => ({
  //       name: field.value,
  //       label: field.value,
  //       type: field.type,
  //       required: field.required,
  //     })),
  //   };

  //   axios
  //     .post(
  //       "https://expoproject.saeedantechpvt.com/api/admin/judges",
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       navigate("/links", { state: { contest_id: contest_id } });
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };
  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("contest_id", contest_id);
    formData.append("link", `https://frontend.saeedantechpvt.com/admin-login`);
    judges.forEach((field, index) => {
      formData.append(`profile_picture[${index}]`, field.profile_picture);
      formData.append(`email[${index}]`, field.email);
      formData.append(`judge_name[${index}]`, field.judge_name);
      formData.append(`id[${index}]`, judge_ids_R[index] || "");
    });
    textFields.forEach((field, index) => {
      formData.append(`fields[${index}][name]`, field.value);
      formData.append(`fields[${index}][label]`, field.value);
      formData.append(`fields[${index}][type]`, field.type);
      formData.append(`fields[${index}][required]`, field.required);
    });
    dispatch({
      type: "TXT_FIELDS",
      payload: textFields,
    });
    // localStorage.removeItem("judges");
    // const fields = textFields.map((field) => ({
    //   name: field.value,
    //   label: field.label,
    //   type: field.type,
    //   required: field.required,
    // }));
    // formData.append("fields", JSON.stringify(fields));
    axios
      .post("https://deeplink.saeedantechpvt.com/api/admin/judges", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        enqueueSnackbar("Judges Added Successfully", { variant: "success" });
        const judge_ids = response?.data?.data?.judges?.map((item) => item.id);
        dispatch({
          type: "JUD_ID",
          payload: judge_ids,
        });
        // console.log(judge_ids, "YE RESPONSEHA");
        // localStorage.removeItem("judges");
        navigate("/links", { state: { contest_id: contest_id } });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  };
  // const handleSubmit = () => {
  //   const payload = {
  //     contest_id,
  //     judge_name: names,

  //     email: judges.map(judge => judge.email),
  //     profile_picture: profile,
  //     fields: textFields.map((field, index) => ({
  //       name: `{index + 1}`,
  //       label: field.label || `${index + 1}`,
  //       type: field.type,
  //       value: field.value,
  //       required: field.required,
  //     }))
  //   };

  //   axios.post('https://expoproject.saeedantechpvt.com/api/admin/judges', payload, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       navigate('/links');
  //     })
  //     .catch(error => {
  //       console.error('There was an error!', error);
  //     });
  // };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isSmall ? "3rem 5%" : "3rem 20%",
          minHeight: "80vh",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PushBack />
          <Typography
            sx={{ fontSize: "2rem", fontWeight: 600, textAlign: "center" }}
          >
            Create Score Card
          </Typography>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          sapiente inventore libero accusantium quisquam adipisci numquam quos
          harum fugiat quis.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid
            item
            xs={4}
            md={6}
            lg={6}
            sm={6}
            sx={{ backgroundColor: "#f9fafc" }}
          >
            <Typography
              sx={{ fontSize: isSmall ? "0.9rem" : "1.3rem", fontWeight: 600 }}
            >
              Field Selection
            </Typography>
            <br />

            <DraggableButton />
          </Grid>
          <Grid item xs={8} md={6} lg={6} sm={8}>
            <DropArea onDrop={handleDrop}>
              {textFields.map((field, index) => (
                <TextField
                  key={index}
                  label={`Enter Text ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={field.value}
                  onChange={(e) =>
                    handleTextFieldChange(index, "value", e.target.value)
                  }
                />
              ))}
            </DropArea>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress sx={{ color: "red" }} size={20} />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default CreateScoreCard;
