// src/store/actions/formActions.js
import api from "../../utils/Api";

export const fetchFormJudegForm = (id) => async (dispatch) => {
  try {
    const res = await api.get(`judge/score-cards/${id}`);
    dispatch({ type: "GET_JUDEG_RESP", payload: res.data });
    return res;
  } catch (err) {
    dispatch({ type: "ADD_EVENT_FAILURE", error: err });
    throw err;
  }
};



export const submitJudegFormData = (dataToSubmit) => async (dispatch) => {
    try {
      const res = await api.post("judge/submit-score", dataToSubmit); // Adjust the endpoint as needed
      dispatch({ type: "SUBMIT_FORM_SUCCESS", payload: res.data });
      return res;
    } catch (err) {
      dispatch({ type: "SUBMIT_FORM_FAILURE", error: err });
      throw err;
    }
  };
