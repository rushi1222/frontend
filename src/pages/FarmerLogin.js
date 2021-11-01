import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateFarmerAction } from "../redux/FarmerLoginReducer";

import { AppNav } from "./AppNav";

export const FarmerLogin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const frole = "FARMER";

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePasswd = (e) => setPasswd(e.target.value);

  const signInFarmer = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      dispatch(authenticateFarmerAction({ username : userName , pwd : passwd, role:frole, }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  //Admin signed in
  if (state.farmerlogin.authSuccess === true) {
    // Redirecting the user /farmer-list page;
    history.push("/farmer-home");
  }

  return (
    <div className="bgimage">

<div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">

<Link to="/home">
            <h6 className="ml-3">HOME</h6>
          </Link>

          </div>
      <div className=" justify-content-center align-items-center">
       

        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-50">
            <h1 className="text-center alert alert-info">FARMER SIGN IN</h1>

            {state.farmerlogin.authFailure && (
              <h6 className="text-center alert alert-danger">
                Invalid Credentials !!
              </h6>
            )}

            <form ref={formEl} className="needs-validation" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={userName}
                  onChange={updateUserName}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={passwd}
                  onChange={updatePasswd}
                  placeholder="Enter Password"
                  className="form-control form-control-lg mb-2"
                  maxLength="25"
                  minLength="6"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={frole}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>
              <div>
                <input
                  type="button"
                  value="LOGIN"
                  onClick={signInFarmer}
                  className="btn btn-info btn-lg w-100"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
