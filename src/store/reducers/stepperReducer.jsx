const initialState = {
  event_name: "",
  contest_name: "",
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  max_contestants: "",
  reg_form: "",
  judge_ids: "",
  expo_id: "",
  cont_id: "",
  form_id: "",
  text_fields: "",
  judges: "",
};

const RESET_STATE = "RESET_STATE";

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_NAME": {
      return {
        ...state,
        event_name: action.payload.eventName,
      };
    }
    case "CONT_NAME": {
      return {
        ...state,
        contest_name: action.payload,
      };
    }
    case "REG_TIME": {
      return {
        ...state,
        start_date: action.payload.start_date,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        end_date: action.payload.end_date,
      };
    }
    case "MAX_CONT": {
      return {
        ...state,
        max_contestants: action.payload.max_contestants,
      };
    }
    case "REG_FORM": {
      return {
        ...state,
        reg_form: action.payload,
      };
    }
    case "ADD_JUDGE": {
      return {
        ...state,
        judges: action.payload,
      };
    }
    case "EXPO_ID": {
      return {
        ...state,
        expo_id: action.payload,
      };
    }
    case "CONT_ID": {
      return {
        ...state,
        cont_id: action.payload,
      };
    }
    case "FORM_ID": {
      return {
        ...state,
        form_id: action.payload,
      };
    }
    case "JUD_ID": {
      return {
        ...state,
        judge_ids: action.payload,
      };
    }
    case "TXT_FIELDS": {
      return {
        ...state,
        text_fields: action.payload,
      };
    }
    case "JUDGES": {
      return {
        ...state,
        judges: action.payload,
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
