import { createSlice } from "@reduxjs/toolkit";
import { addEvent as apiAddEvent, editEvent as apiEditEvent, getEvent as apiGetEvent } from "../actions/adminActions";

const initialState = {
  event: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEventStart(state) {
      state.loading = true;
      state.error = null;
    },
    addEventSuccess(state, action) {
      state.loading = false;
      state.event = action.payload;
    },
    addEventFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editEventStart(state) {
      state.loading = true;
      state.error = null;
    },
    editEventSuccess(state, action) {
      state.loading = false;
      state.event = action.payload;
    },
    editEventFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getEventStart(state) {
      state.loading = true;
      state.error = null;
    },
    getEventSuccess(state, action) {
      state.loading = false;
      state.event = action.payload;
    },
    getEventFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearEvent(state) {
      state.event = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  addEventStart,
  addEventSuccess,
  addEventFailure,
  editEventStart,
  editEventSuccess,
  editEventFailure,
  getEventStart,
  getEventSuccess,
  getEventFailure,
  clearEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;

// Thunks (Async Action Creators)
export const addEvent = (formValues) => async (dispatch) => {
  try {
    dispatch(addEventStart());
    const response = await apiAddEvent(formValues);
    dispatch(addEventSuccess(response.data.payload));
    return response;
  } catch (error) {
    dispatch(addEventFailure(error.message));
    throw error;
  }
};

export const editEvent = (eventId, formValues) => async (dispatch) => {
  try {
    dispatch(editEventStart());
    const response = await apiEditEvent(eventId, formValues);
    dispatch(editEventSuccess(response.data.payload));
    return response;
  } catch (error) {
    dispatch(editEventFailure(error.message));
    throw error;
  }
};

export const getEvent = (eventId) => async (dispatch) => {
  try {
    dispatch(getEventStart());
    const response = await apiGetEvent(eventId);
    dispatch(getEventSuccess(response.data.payload));
    return response;
  } catch (error) {
    dispatch(getEventFailure(error.message));
    throw error;
  }
};
