import axios from "axios";

const initState = {
  // supplierid: [],
  // supplierHomeList: [],
  progress: false,
  farmerid:"",  
  uref: {},


  // on click of update button; the key will be updated.
  
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const FARMER_GET_ACTION_TYPE = "FARMER_GET_ACTION_TYPE";
const FARMER_UPDATE_RENDER_ACTION_TYPE = "FARMER_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getFarmerAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const farmerid=localStorage.getItem("userid");
   
    const url = `http://localhost:8081/farm/getfarmer/${payload}`;
    const response = await axios.get(url,payload );
    console.log(response.data);
    // console.log(response);

    // UI UPDATE oh
    dispatch({ type: "FARMER_GET_ACTION_TYPE", payload: response.data });
  };
};




export const updateSupplierAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/farmers/update/${payload.id}`;
    // const urla = `http://localhost:8080/farm/logindetails/update/${payload.userid}`;
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

export const deleteFarmerAction = (payload) => {
  return async (dispatch) => {
    // MAKE AN API/SERVER CALL
    const url = `http://localhost:8081/farm/farmers/delete/${payload.supplierid}`;
    await axios.delete(url);

    // Upate the UI TODO :: Fetch The Updated List
    // dispatch(getSupplierAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATING THE UI
  // 5
  return { type: FARMER_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function FarmerHomePageReducer(state = initState, action) {
  switch (action.type) {
    case FARMER_GET_ACTION_TYPE:
      return { ...state, farmerid: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case FARMER_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
