const initialState = {};

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ACTION": {
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        isAuthenticated: true,
      };
    }

    default:
      return state;
  }
};

export default stepperReducer;
