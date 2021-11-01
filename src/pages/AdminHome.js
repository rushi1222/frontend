import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { adminsignOutAction } from "../redux/AdminLoginReducer";

export const AdminHome  = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
  //  useEffect(() => dispatch(getAllApprovedAdsAction()), []);

    const signOut = () => {
        // Cookies / session are getting removed from the browser
        dispatch(adminsignOutAction());
    
        // Redirect the user to login page.
        history.push("/admin-signin");
      };

      return (
        <div>
            <div  className="bg bg-dark p-1 ">
       
               <center className=" text-light justify-content-center align-items-center" style={{fontFamily:"cursive"}}>
              <h4>  Admin Home Page </h4> 
               </center>
              <h6 className="d-flex justify-content-end mx-4 "  >
  
             
              <Link to="/admin-login">
               <a onClick={signOut} style= {{color: "lavender",fontFamily:"cursive"}}>Sign Out</a>
              </Link>        
              </h6>
            </div>
            </div>
      );
}
