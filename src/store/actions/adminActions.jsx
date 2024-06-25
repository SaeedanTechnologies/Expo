import api from "../../utils/Api";

export const adminRegister = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("admin/register", formValues);

    return res;
  } catch (err) {
    throw err;
  }
};
