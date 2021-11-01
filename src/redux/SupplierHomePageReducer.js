import axios from "axios";

const initState = {
  // supplierid: [],
  // supplierHomeList: [],
  progress: false,
  supplierid:"",  
  uref: {},


  // on click of update button; the key will be updated.
  
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const SUPPLIER_GET_ACTION_TYPE = "SUPPLIER_GET_ACTION_TYPE";
const SUPPLIER_UPDATE_RENDER_ACTION_TYPE = "SUPPLIER_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getSupplierAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const supplierid=localStorage.getItem("userid");
   
    const url = `http://localhost:8081/farm/getsupplier/${payload}`;
    const response = await axios.get(url,payload );
    console.log(response.data);
    // console.log(response);

    // UI UPDATE
    dispatch({ type: "SUPPLIER_GET_ACTION_TYPE", payload: response.data });
  };
};




export const updateSupplierAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/suppliers/update/${payload.id}`;
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

export const deleteSupplierAction = (payload) => {
  return async (dispatch) => {
    // MAKE AN API/SERVER CALL
    const url = `http://localhost:8081/farm/suppiers/delete/${payload.supplierid}`;
    await axios.delete(url);

    // Upate the UI TODO :: Fetch The Updated List
    // dispatch(getSupplierAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATING THE UI
  // 5
  return { type: SUPPLIER_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function SupplierHomePageReducer(state = initState, action) {
  switch (action.type) {
    case SUPPLIER_GET_ACTION_TYPE:
      return { ...state, supplierid: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case SUPPLIER_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
