import axios from "axios";

const initState = {
  progress: false,
  authFailure: false,
  authSuccess: false,
 
};
//const USER_LOGIN_ACTION_TYPE= "USER_LOGIN_ACTION_TYPE";
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const AUTH_FAILURE_ACTION_TYPE = "AUTH_FAILURE_ACTION_TYPE";
const AUTH_SUCCESS_ACTION_TYPE = "AUTH_SUCCESS_ACTION_TYPE";




export const authenticateAdminAction = (payload) => {
  return async (dispatch) => {
    try {
      // API CALL :: VERIFICATION
      const url = `http://localhost:8081/farm/login`;
      console.log(payload);
      const response = await axios.post(url, payload);
      console.log(response);

      if (response.data !== "Incorrect UserName or Password!!") {
        // VALID USER
        // updat the UI:: THIS IS TRICKY
        dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: true });

        localStorage.setItem("authSuccess", "1");

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
      dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });

      setTimeout(() => {
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
      }, 5000);
    }
  };
};

export const adminsignOutAction = () => {
  return async (dispatch) => {
    console.log("signout");

    // remove the storage/cookies
    localStorage.removeItem("authSuccess");

    dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: false });
  };
};

export function AdminLoginReducer(state = initState, action) {
  switch (action.type) {
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    case AUTH_FAILURE_ACTION_TYPE:
      return { ...state, authFailure: action.payload };

    case AUTH_SUCCESS_ACTION_TYPE:
      return { ...state, authSuccess: action.payload };

    
    default:
      return state;
  }
}
