import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  deleteFarmerAction,
  getAllFarmerAction,
  updateRenderAction,
} from "../redux/FarmerReducer";
import { adminsignOutAction } from "../redux/AdminLoginReducer";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

export const FarmerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllFarmerAction());
  }, []);
  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.farmerid);
    // Dispatch the call.
    dispatch(deleteFarmerAction(item));
  };
  const updateRecord = (item) => {
    console.log("Update Record", item.farmerid);
    dispatch(updateRenderAction(item));
    history.push("/farmer-update");
  };
  const adminsignOut = () => {
    dispatch(adminsignOutAction());
    history.push("/home");
  };
  return (
    
      <div>
       
        <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">
          
          <Link to="/supplier-list">
            <h6 className="mr-3">SUPPLIER-LIST</h6>
          </Link>
          <Link to="/loginDetails-list">
            <h6 className="mr-3">LOGIN-DETAILS</h6>
          </Link>
          <Link onClick={adminsignOut} to="/admin-signin">
            <h6>SIGN-OUT</h6>
          </Link>
        </div>
        <div>
          <div className="alert alert-success">
            <h3>
              <center>LIST OF FARMERS</center>
            </h3>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">FarmerID</th>
                <th scope="col">FarmerName</th>
                <th scope="col">Address</th>
                <th scope="col">ContactNo</th>
                <th scope="col">
                  <center>Action</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {state.farmer.farmerList.map((item, index)  => (
                <tr key={index}>
                  <th scope="row">{item.farmerid}</th>
                  <td>{item.farmername}</td>
                  <td>{item.farmeraddress}</td>
                  <td>{item.farmmobileno}</td>
                  
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
                        onClick={() => updateRecord(item)}
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
                        onClick={() => deleteRecord(item)}
                      >
                        Delete
                      </Button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};
