import api from "../../utils/Api";

export const getStartContest = (contestId) => async (dispatch) => {
  try {
    const res = await api.get(`admin/contest-start/${contestId}`);
console.log(res, 'response from contest start api')

    return res;
  } catch (err) {
    throw err;
  }
};




export const setNextParticipant = (contestId, participant_id) => async (dispatch) => {
    try {
      const res = await api.post(`admin/judge-participant/${contestId}`, {participant_id});
  console.log(res, 'response from dge set participant')

      return res;
    } catch (err) {
      throw err;
    }
  };

