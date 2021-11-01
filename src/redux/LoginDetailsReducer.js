import axios from "axios";

const initState = {
  loginDetailsList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const LOGINDETAILS_GET_ALL_ACTION_TYPE = "LOGINDETAILS_GET_ALL_ACTION_TYPE";
const LOGINDETAILS_UPDATE_RENDER_ACTION_TYPE = "LOGINDETAILS_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllLoginDetailsAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8081/farm/getlogindetails`;
    const response = await axios.get(url);

    // console.log(response);

    // UI UPDATE
    dispatch({ type: "LOGINDETAILS_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createAdminAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/addAdmin`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const createLoginDetailsAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/register`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateLoginDetailsAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/logindetails/update/${payload.id}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteLoginDetailsAction = (payload) => {
  return async (dispatch) => {
    // MAKE AN API/SERVER CALL
    const url = `http://localhost:8081/farm/logindetails/delete/${payload.userid}`;
    await axios.delete(url);

    // Upate the UI TODO :: Fetch The Updated List
    dispatch(getAllLoginDetailsAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATING THE UI
  // 5
  return { type: LOGINDETAILS_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function LoginDetailsReducer(state = initState, action) {
  switch (action.type) {
    case LOGINDETAILS_GET_ALL_ACTION_TYPE:
      return { ...state, loginDetailsList: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case LOGINDETAILS_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
