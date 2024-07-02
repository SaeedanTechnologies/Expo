import api from "../../utils/Api";

export const getStartContest = (contestId) => async (dispatch) => {
  try {
    const res = await api.get(`admin/contest-start/${contestId}`);
    return res;
  } catch (err) {
    throw err;
  }
};




export const setNextParticipant = (contestId, participant_id) => async (dispatch) => {
    try {
      const res = await api.post(`admin/judge-participant/${contestId}`, {participant_id});
      return res;
    } catch (err) {
      throw err;
    }
  };



  export const getAllRecords = (contestId) => async (dispatch) => {
    try {
      const res = await api.get(`admin/contest-result/${contestId}`);
      return res;
    } catch (err) {
      throw err;
    }
  };

