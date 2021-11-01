import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createFarmerAction,
  updateFarmerAction,
  updateRenderAction,
} from "../redux/FarmerReducer";
import { AppNav } from "./AppNav";
import { adminsignOutAction } from "../redux/AdminLoginReducer";

export const FarmerUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [farmername, setFarmername] = useState(state.farmer.uref.farmername);
  const [farmeraddress, setFarmeraddress] = useState(state.farmer.uref.farmeraddress);
  const [farmmobileno, setFarmmobileno] = useState(state.farmer.uref.farmmobileno);
  
  

  const updateFarmername = (e) => setFarmername(e.target.value);
  const updateFarmeraddress = (e) => setFarmeraddress(e.target.value);
  const updateFarmmobileno = (e) => setFarmmobileno(e.target.value);
  

  const addNewFarmer = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createFarmerAction({
            farmername,
            farmeraddress,
            farmmobileno,
        })
      );

      // clear the form
      setFarmername("");
      setFarmeraddress("");
      setFarmmobileno("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateFarmer = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateFarmerAction({
          id: state.farmer.uref.farmerid,
          farmername,
          farmeraddress,
          farmmobileno,
        })
      );

      // clear the form
      setFarmername("");
      setFarmeraddress("");
      setFarmmobileno("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  const adminsignOut = () => {
    dispatch(adminsignOutAction());

    history.push("/home");
  };

  const resetForm = () => {
    dispatch(updateRenderAction({}));

    setFarmername("");
    setFarmeraddress("");
    setFarmmobileno("");
  };

  return (
    <div className=" p-4" style={{ backgroundColor: "antiquewhite" }}>
      <div>
        <div style={{ background: "" }}>
          
          <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">
            <Link to="/farmer-list">
              <h6 className="mr-3">FARMER-LIST</h6>
            </Link>

            {/* <Link to="/supplier-list">
              <h6 className="mr-3">SUPPLIER-LIST</h6>
            </Link> */}

            {/* <Link to="/loginDetails-list">
              <h6 className="mr-3">LOGIN-DETAILS</h6>
            </Link> */}

           

            <Link onClick={adminsignOut} to="/admin-signin">
              <h6>SIGN-OUT</h6>
            </Link>
          </div>
          <div>
            <center>
              {" "}
              <div className="alert alert-primary w-75">
              {state.farmer.uref.farmerid ? (
                  <h3>
                    <center>UPDATE FARMER DETAILS</center>
                  </h3>
                ) : (
                  <h3>
                    <center>ADD NEW FARMER</center>
                  </h3>
                )}
              </div>
            </center>

            {state.farmer.progress && (
              <div className="mx-4 alert alert-success">Operation Success</div>
            )}

            {/* <form>
            <div className="form-group row">
              <label for="inputEmail3" class="col-lg-2 col-form-label">
                Email
              </label>
              <div>
                <input
                  type="email"
                  className="form-control w-50 "
                  id="inputEmail3"
                  placeholder="Email"
                />
              </div>
            </div>
          </form> */}

            
            <div className="container  alert alert-warning w-75">
              <center>
                <form ref={formEl} mx-4 className="needs-validation" noValidate>
                  {" "}
                  <h4>Farmer Name</h4>
                  <input
                    type="text"
                    value={farmername}
                    onChange={updateFarmername}
                    className="form-control form-control-lg mb-1 w-50"
                    placeholder="Enter Farmer's Name"
                    minLength="3"
                    maxLength="30"
                    required
                  />
                  <div>
                    <h4>Address</h4>
                    <input
                      type="text"
                      value={farmeraddress}
                      onChange={updateFarmeraddress}
                      className="form-control form-control-lg mb-1  w-50"
                      placeholder="Enter Your Address"
                      minLength="10"
                      maxLength="50"
                      required
                    />
                  </div>
                  <div>
                    <h4>Contact No</h4>
                    <input
                      type="text"
                      value={farmmobileno}
                      onChange={updateFarmmobileno}
                      className="form-control form-control-lg mb-1  w-50"
                      placeholder="Enter Your Contact No."
                      minLength="10"
                      maxLength="10"
                      required
                    />
                  </div>
                 
                  
                  <div>
                    {state.farmer.uref.farmerid ? (
                      <input
                        type="button"
                        onClick={updateFarmer}
                        value="Update Farmer"
                        className="btn btn-lg btn-primary w-50"
                      />
                    ) : (
                      <input
                        type="button"
                        onClick={addNewFarmer}
                        value="Add Farmer"
                        className="btn btn-lg btn-success w-50"
                      />
                    )}
                  </div>
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
