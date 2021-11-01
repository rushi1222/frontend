import axios from "axios";

const initState = {
  progress: false,
  authFailure: false,
  authSuccess: false,
  userid: "",
};
//const USER_LOGIN_ACTION_TYPE= "USER_LOGIN_ACTION_TYPE";
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const AUTH_FAILURE_ACTION_TYPE = "AUTH_FAILURE_ACTION_TYPE";
const AUTH_SUCCESS_ACTION_TYPE = "AUTH_SUCCESS_ACTION_TYPE";
const USERID_ACTION = "USERID_ACTION";

const USER_CREATE_ACTION_TYPE = "USER_CREATE_ACTION_TYPE";

export const authenticateSupplierAction = (payload) => {
  return async (dispatch) => {
    try {
      // API CALL :: VERIFICATION
      console.log(payload);
      const url = `http://localhost:8081/farm/login`;
      const response = await axios.post(url, payload);
      console.log(response.data);
localStorage.setItem("key",response.data);
      if (response.data === response.data) {
        // VALID USER
        // updat the UI:: THIS IS TRICKY
        dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: true });

        localStorage.setItem("authSuccess", "1");
        
        localStorage.setItem("userid", response.data + "");

        // NOT DOING THE ACTIVITY OF 5 SECONDS :: page will be redirected to anohter page.
      } else {
        // INVALID USER :: AUTH FAILS
        // updat the UI:: THIS IS TRICKY
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });

        setTimeout(() => {
          dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
        }, 5000);
      } 
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });

      setTimeout(() => {
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
      }, 5000);
    }
  };
};

export const suppliersignOutAction = () => {
  return async (dispatch) => {
    console.log("signout");

    // remove the storage/cookies
    localStorage.removeItem("authSuccess");

    dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: false });
  };
};

export function SupplierLoginReducer(state = initState, action) {
  switch (action.type) {
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    case AUTH_FAILURE_ACTION_TYPE:
      return { ...state, authFailure: action.payload };

    case AUTH_SUCCESS_ACTION_TYPE:
      return { ...state, authSuccess: action.payload };

    case USERID_ACTION:
      return { ...state, userid: action.payload };
    default:
      return state;
  }
}
// i aksed my frnd from other team to send sample of their code for this purpose
// i will show u that in that theydefined state and setstate