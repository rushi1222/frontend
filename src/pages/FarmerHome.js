import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
 import {
  deleteFarmerAction,
  getFarmerAction,
 updateRenderAction} from "../redux/FarmerHomePageReducer";
import { farmersignOutAction } from "../redux/FarmerLoginReducer";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";



export const FarmerHome  = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
  
  
      useEffect(() => {
        dispatch(getFarmerAction(localStorage.getItem('key')));
      }, [dispatch]);
      const deleteRecord = (item) => {
        console.log("DELETE RECORD", item.farmerid);
        // Dispatch the call.
        dispatch(deleteFarmerAction(item));
      };
      const updateRecord = (item) => {
        console.log("Update Record", item.farmerid);
        dispatch(updateRenderAction(item));
        history.push("/supplier-update");
      };
     
    const signOut = () => {
        // Cookies / session are getting removed from the browser
        dispatch(farmersignOutAction());
    
        // Redirect the user to login page.
        history.push("/supplier-login");
      };

      

      return (
        <div>
            <div  className="bg bg-dark p-1 ">
       
               <center className=" text-light justify-content-center align-items-center" style={{fontFamily:"cursive"}}>
              <h4>  Farmer Home Page </h4> 
               </center>
              <h6 className="d-flex justify-content-end mx-4 "  >
              <Link to="/supplier-login">
               <a onClick={signOut} style= {{color: "lavender",fontFamily:"cursive"}}>Sign Out</a>
              </Link>        
              </h6>
             
              <div class="d-flex text-light justify-content-around">
              <div class="p-2 bd-highlight"><Link>View Complaint Status</Link></div>
              <div class="p-2 bd-highlight"><Link>Sell product</Link></div>
              <div class="p-2 bd-highlight"><Link>Sell product details</Link></div>
              <div class="p-2 bd-highlight"><Link>complaint page</Link></div>
              <div class="p-2 bd-highlight"><Link>Crop advertisment details</Link></div>
              
              
              </div>
            </div>
            <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">farmerid</th>
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
                  <th scope="row">{state.farmerhome.farmerid.farmerid}</th>
                  <td>{state.farmerhome.farmerid.farmername}</td>
                  <td>{state.farmerhome.farmerid.farmeraddress}</td>
                  <td>{state.farmerhome.farmerid.farmmobileno}</td>
                  
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
                        onClick={() => updateRecord(state.farmerhome.farmerid)}
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
                        onClick={() => deleteRecord(state.farmerhome.farmerid)}
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
