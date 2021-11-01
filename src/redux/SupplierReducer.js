import axios from "axios";

const initState = {
  supplierList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const SUPPLIER_GET_ALL_ACTION_TYPE = "SUPPLIER_GET_ALL_ACTION_TYPE";
const SUPPLIER_UPDATE_RENDER_ACTION_TYPE = "SUPPLIER_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllSupplierAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8081/farm/suppliers`;
    const response = await axios.get(url);

    // console.log(response);

    // UI UPDATE
    dispatch({ type: "SUPPLIER_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createSupplierAction = (payload) => {
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

export const updateSupplierAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8081/farm/suppliers/update/${payload.id}`;
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
    const url = `http://localhost:8081/farm/suppliers/delete/${payload.supplierid}`;
    await axios.delete(url);

    // Upate the UI TODO :: Fetch The Updated List
    dispatch(getAllSupplierAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATING THE UI
  // 5
  return { type: SUPPLIER_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function SupplierReducer(state = initState, action) {
  switch (action.type) {
    case SUPPLIER_GET_ALL_ACTION_TYPE:
      return { ...state, supplierList: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case SUPPLIER_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
