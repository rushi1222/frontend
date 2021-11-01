import axios from "axios";

const initState = {
 
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: FARMER :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";


export const createSupplierSignupAction = (payload) => {
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



// REDUCER FOR STATE UPDATE
export function SupplierSignupReducer(state = initState, action) {
  switch (action.type) {
    
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
   

    default:
      return state;
  }
}
