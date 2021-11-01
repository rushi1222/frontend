import {
    applyMiddleware,
    combineReducers,
    createStore,
  } from "@reduxjs/toolkit";
  import {composeWithDevTools} from 'redux-devtools-extension'
  import thunk from "redux-thunk";
  import { AdminLoginReducer } from "./AdminLoginReducer";
  import { SupplierLoginReducer } from "./SupplierLoginReducer";
  import { FarmerLoginReducer } from "./FarmerLoginReducer";
  import { FarmerReducer } from "./FarmerReducer";
  import { SupplierReducer } from "./SupplierReducer";
  import { LoginDetailsReducer } from "./LoginDetailsReducer";
import { FarmerSignupReducer } from "./FarmerSignupReducer";
import { SupplierHomePageReducer } from "./SupplierHomePageReducer";
import { FarmerHomePageReducer} from "./FarmerHomePageReducer";

  
  const rootReducer = combineReducers({
    farmerlogin: FarmerLoginReducer,
    supplierlogin: SupplierLoginReducer,
    signin: AdminLoginReducer,
    farmer: FarmerReducer,
    supplier: SupplierReducer,
    logindetails: LoginDetailsReducer,
    farmersignup: FarmerSignupReducer,
    supplierhome : SupplierHomePageReducer,
    farmerhome: FarmerHomePageReducer,
    farmersignup: FarmerSignupReducer,
  });
  
  const middleware=[thunk]
  const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(...middleware)));
  export { store };
  