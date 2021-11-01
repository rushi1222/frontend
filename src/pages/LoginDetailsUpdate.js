import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoginDetailsAction,
  updateLoginDetailsAction,
  updateRenderAction,
} from "../redux/LoginDetailsReducer";
import { AppNav } from "./AppNav";
import { adminsignOutAction } from "../redux/AdminLoginReducer";

export const LoginDetailsUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [username, setUsername] = useState(state.logindetails.uref.username);
  const [pwd, setPwd] = useState(state.logindetails.uref.pwd);
  const [role, setRole] = useState(state.logindetails.uref.role);
  
  

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePwd = (e) => setPwd(e.target.value);
  const updateRole = (e) => setRole(e.target.value);
  

  

  const addNewLoginDetails = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createLoginDetailsAction({
          username,
          pwd,
          role,
        })
      );

      // clear the form
      setUsername("");
      setPwd("");
      setRole("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateLoginDetails = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateLoginDetailsAction({
          id: state.logindetails.uref.userid,
          username,
            pwd,
            role,
        })
      );

      // clear the form
      setUsername("");
      setPwd("");
      setRole("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  const adminsignOut = () => {
    dispatch(adminsignOutAction());

    history.push("/admin-signin");
  };

  const resetForm = () => {
    dispatch(updateRenderAction({}));

    setUsername("");
    setPwd("");
    setRole("");
  };

  return (
    <div className=" p-4" style={{ backgroundColor: "antiquewhite" }}>
      <div>
        <div style={{ background: "" }}>
          
          <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">
            <Link to="/loginDetails-list">
              <h6 className="mr-3">LOGIN-DETAILS</h6>
            </Link>

            {/* <Link to="/farmer-list">
              <h6 className="mr-3">FARMER-LIST</h6>
            </Link> */}

            {/* <Link to="/supplier-list">
              <h6 className="mr-3">SUPPLIER-LIST</h6>
            </Link> */}

            {/* <Link to="/logindetails-update">
              <h6 onClick={resetForm} className="mr-3">
              LOGINDETAILS-UPDATE{" "}
              </h6>
            </Link> */}

            <Link onClick={adminsignOut} to="/admin-signin">
              <h6>SIGN-OUT</h6>
            </Link>
          </div>
          <div>
            <center>
              {" "}
              <div className="alert alert-primary w-75">
              {state.logindetails.uref.userid ? (
                  <h3>
                    <center>UPDATE LOGIN DETAILS</center>
                  </h3>
                  ) : (
                    <h3>
                      <center>ADD NEW LOGIN DETAILS</center>
                    </h3>
                )}
              </div>
            </center>

            {state.logindetails.progress && (
              <div className="mx-4 alert alert-success">Operation Success!!</div>
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
                  <div>
                    <h4>User Name</h4>
                    <input
                      type="text"
                      value={username}
                      onChange={updateUsername}
                      className="form-control form-control-lg mb-1  w-50"
                      placeholder="Enter User Name"
                      minLength="3"
                      maxLength="30"
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
                      placeholder="Enter Password"
                      minLength="6"
                      maxLength="10"
                      required
                    />
                  </div>
                  <div>
                    <h4>Role</h4>
                    <input
                      type="text"
                      value={role}
                     onChange={updateRole}
                      className="form-control form-control-lg mb-1  w-50"
                     placeholder="ROLE"
                      minLength="5"
                      maxLength="8"
                      required
                    />
                  </div>
                 
                  
                  <div>
                  {state.logindetails.uref.userid ? (
                      <input
                        type="button"
                        onClick={updateLoginDetails}
                        value="Update Login Details"
                        className="btn btn-lg btn-primary w-50"
                      />
                     ) : (
                        <input
                          type="button"
                          onClick={addNewLoginDetails}
                          value="Add Login Details"
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
