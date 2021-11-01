import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
 import {
  deleteSupplierAction,
   getSupplierAction,
 updateRenderAction} from "../redux/SupplierHomePageReducer";
import { suppliersignOutAction } from "../redux/SupplierLoginReducer";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";



export const SupplierHome  = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
  
  
      useEffect(() => {
        dispatch(getSupplierAction(localStorage.getItem('key')));
      }, [dispatch]);
      const deleteRecord = (item) => {
        console.log("DELETE RECORD", item.supplierid);
        // Dispatch the call.
        dispatch(deleteSupplierAction(item));
      };
      const updateRecord = (item) => {
        console.log("Update Record", item.supplierid);
        dispatch(updateRenderAction(item));
        history.push("/supplier-update");
      };
     
    const signOut = () => {
        // Cookies / session are getting removed from the browser
        dispatch(suppliersignOutAction());
    
        // Redirect the user to login page.
        history.push("/supplier-login");
      };

      

      return (
        <div>
            <div  className="bg bg-dark p-1 ">
       
               <center className=" text-light justify-content-center align-items-center" style={{fontFamily:"cursive"}}>
              <h4>  Supplier Home Page </h4> 
               </center>
              <h6 className="d-flex justify-content-end mx-4 "  >
              <Link to="/supplier-login">
               <a onClick={signOut} style= {{color: "lavender",fontFamily:"cursive"}}>Sign Out</a>
              </Link>        
              </h6>
             
              <div class="d-flex text-light justify-content-around">
              <div class="p-2 bd-highlight"><Link>Post Advertisment</Link></div>
              <div class="p-2 bd-highlight"><Link>Received Advertisment</Link></div>
              
              
              </div>
            </div>
            <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SupplierID</th>
                <th scope="col">SupplierName</th>
                <th scope="col">Address</th>
                <th scope="col">ContactNo</th>
                <th scope="col">
                  <center>Action</center>
                </th>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <th scope="row">{state.supplierhome.supplierid.supplierid}</th>
                  <td>{state.supplierhome.supplierid.suppliername}</td>
                  <td>{state.supplierhome.supplierid.supplieraddress}</td>
                  <td>{state.supplierhome.supplierid.supmobileno}</td>
                  
                  <td>
                    {/* <input
                      type="button"
                      value="Update"
                      className="btn btn-outline-secondary btn-sm  mr-1"
                      // onClick={updateRecord} :1
                      onClick={() => updateRecord(item)}
                    /> */}
                    <center>
                      <Button
                        className="mr-2"
                        startIcon={<UpdateIcon />}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => updateRecord(state.supplierhome.supplierid)}
                      >
                        Update
                      </Button>
                      {/* <input
                      type="button"
                      value="Delete"
                      // onClick={deleteRecord}
                      onClick={() => deleteRecord(item)}
                      className="btn btn-outline-danger btn-sm"
                    /> */}
                      <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteRecord(state.supplierhome.supplierid)}
                      >
                        Delete
                      </Button>
                    </center>
                  </td>
                </tr>
             
            </tbody>
          </table>
            
            </div>
      );
}
