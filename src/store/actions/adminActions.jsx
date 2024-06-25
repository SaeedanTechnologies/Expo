import api from "../../utils/Api";

export const addEvent = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("admin/expo", formValues);
    dispatch({ type: "ADD_EVENT_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    dispatch({ type: "ADD_EVENT_FAILURE", error: err });
    throw err;
  }
};

export const addContest = (formValues) => async (dispatch) => {
    try {
      const res = await api.post("admin/expo", formValues);
      dispatch({ type: "ADD_EVENT_SUCCESS", payload: res.data });
      return res;
    } catch (err) {
      dispatch({ type: "ADD_EVENT_FAILURE", error: err });
      throw err;
    }
  };
  