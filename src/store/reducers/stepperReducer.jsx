const initialState = {
  event_name: "",
  contest_name: "",
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  max_contestants: "",
  reg_form: "",
  judges: "",
  expo_id: "",
  cont_id: "",
};

const RESET_STATE = "RESET_STATE";

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_NAME": {
      return {
        ...state,
        ...action.payload,
        event_name: action.payload.eventName,
      };
    }
    case "CONT_NAME": {
      return {
        ...state,
        ...action.payload,
        contest_name: action.payload,
      };
    }
    case "REG_TIME": {
      return {
        ...state,
        ...action.payload,
        start_date: action.payload.start_date_time,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        end_date: action.payload.end_date_time,
        max_contestants: action.payload.max_contestent,
      };
    }
    case "REG_FORM": {
      return {
        ...state,
        ...action.payload,
        reg_form: action.payload,
      };
    }
    case "ADD_JUDGE": {
      return {
        ...state,
        ...action.payload,
        judges: action.payload,
      };
    }
    case "EXPO_ID": {
      return {
        ...state,
        ...action.payload,
        expo_id: action.payload,
      };
    }
    case "CONT_ID": {
      return {
        ...state,
        ...action.payload,
        cont_id: action.payload,
      };
    }
    case RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default stepperReducer;
