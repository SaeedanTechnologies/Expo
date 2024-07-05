import api from "../../utils/Api";

export const getStartContest = (contestId) => async (dispatch) => {
  try {
    const res = await api.get(`admin/contest-start/${contestId}`);
    return res;
  } catch (err) {
    throw err;
  }
};


export const getBehindScreen = (contestId) => async (dispatch) => {
  try {
    const res = await api.get(`behind-screen-results/${contestId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getBehindScreenResults = (contestId) => async (dispatch) => {
  try {
    const res = await api.get(`contest-result/${contestId}`);
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



  export const setApprovidParticipant = (contest_id, participant_id) => async (dispatch) => {
    try {
      const payload = { participant_id, contest_id }; // Create the payload object
      const res = await api.post(`admin/approve-judge-score`, payload);
      return res;
    } catch (err) {
      throw err;
    }
  };




  export const getAllRecords = (contestId) => async (dispatch) => {
    try {
      const token=localStorage.getItem("token")
      const res = await api.get(`contest-result/${contestId}`);
      return res;
    } catch (err) {
      throw err;
    }
  };



  export const saveToPublicScreen = (contestId) => async (dispatch) => {

      try {
        const token = localStorage.getItem("token");
        const res = await api.post(`admin/publish-record/${contestId}`);
        return res;
      } catch (err) {
        throw err;
      }
    };

    export const rematchApi = (contest_id, participant_id) => async (dispatch) => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.post('admin/manual-rematch-contest', {
          contest_id,
          participant_id
        },);
        return res.data; // Assuming you want to return data from the response
      } catch (err) {
        throw err;
      }
    };

    export const pdfApi = (file) => async (dispatch) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
    
        const res = await api.post('admin/send-pdf', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        return res.data; // Assuming you want to return data from the response
      } catch (err) {
        throw err; // Re-throwing the error to handle it in components or other parts of your application
      }
    };

  export const singleContest = (contestId) => async (dispatch) => {

    try {

      const res = await api.get(`behind-screen-contestinfo/${contestId}`);
      return res;
    } catch (err) {
      throw err;
    }
  };