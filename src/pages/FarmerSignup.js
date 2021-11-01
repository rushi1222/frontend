
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createFarmerSignupAction,

} from "../redux/FarmerSignupReducer";
import { AppNav } from "./AppNav";


export const FarmerSignup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state);
  
    const formEl = useRef();
  
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const role = "FARMER";
  
    const[farmername,setFarmername] =  useState("");
    const [farmeraddress,setFarmeraddress] = useState("");
    const [farmmobileno, setFarmmobileno] = useState("");
  
    const updateUsername = (e) => setUsername(e.target.value);
    const updatePwd = (e) => setPwd(e.target.value);
    const updateFarmername = (e) => setFarmername(e.target.value);
    const updateFarmeraddress = (e) => setFarmeraddress(e.target.value);
    const updateFarmmobileno = (e) => {
        console.log(e.target.value);

        // replacing all the non-digit ^\d with empty string.
        const numericValue = e.target.value.replace(/[^\d]/gi, "");
        setFarmmobileno(numericValue);
    } 



    const signupFarmer = (e) => {
        // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
        // console.log(formEl.current);
        // console.log(formEl.current.checkValidity());
        e.preventDefault();
    
        const isFormValid = formEl.current.checkValidity();
        if (isFormValid) {
          dispatch(
            createFarmerSignupAction({
               "loginDetails" : {
                username,
                pwd,
                role : "FARMER"
               },
               "farmer" : {
                farmername,
                farmeraddress,
                farmmobileno
               }

            })
          );
    
          // clear the form
          setUsername("");
          setPwd("");
          setFarmername("");
          setFarmeraddress("");
          setFarmmobileno("");
          

        } else {
          e.stopPropagation();
          formEl.current.classList.add("was-validated");
        }
      };
    
    
    
      return (
        <div className=" p-4" style={{ backgroundColor: "antiquewhite" }}>
        <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">

<Link to="/home">
            <h6 className="ml-3">HOME</h6>
          </Link>

          </div>
          <div>

            <div style={{ background: "" }}>
              
           
               
    
                {state.farmersignup.progress && (
                  <div className="mx-4 alert alert-success">Operation Success!!!</div>
                )}
    
                
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
                        <h4>Role</h4>
                        <input
                          type="text"
                          value={role}
                          className="form-control form-control-lg mb-1  w-50"
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
                        <h4>User Name</h4>
                        <input
                          type="text"
                          value={username}
                          onChange={updateUsername}
                          className="form-control form-control-lg mb-1  w-50"
                          placeholder="Set Your User Name"
                          minLength="5"
                          maxLength="10"
                          required
                        />
                      </div>
                      <div>
                        <h4>Password</h4>
                        <input
                          type="password"
                          value={pwd}
                          onChange={updatePwd}
                          className="form-control form-control-lg mb-1  w-50"
                          placeholder="Set Your Password"
                          minLength="8"
                          maxLength="10"
                          required
                        />
                      </div>
                     
                      <div>
                <input
                  type="button"
                  value="SIGNUP"
                  onClick={signupFarmer}
                  className="btn btn-info btn-lg w-100"
                />
              </div>
                    </form>
                  </center>
                </div>
              </div>
            </div>
          </div>
        
      );
    };
    