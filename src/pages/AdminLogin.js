import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateAdminAction } from "../redux/AdminLoginReducer";

import { AppNav } from "./AppNav";

export const AdminLogin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const role = "ADMIN";

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePwd = (e) => setPwd(e.target.value);

  const signInAdmin = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      dispatch(authenticateAdminAction({ username : username, pwd : pwd, role : role }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  //Admin signed in
  if (state.signin.authSuccess === true) {
    // Redirecting the user /farmer-list page;
    history.push("/farmer-list");
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
            <h1 className="text-center alert alert-info">ADMIN SIGNIN</h1>

            {state.signin.authFailure && (
              <h6 className="text-center alert alert-danger">
                Invalid Credentials !!
              </h6>
            )}

            <form ref={formEl} className="needs-validation" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={updateUsername}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={pwd}
                  onChange={updatePwd}
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
                  value={role}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>
              <div>
                <input
                  type="button"
                  value="LOGIN"
                  onClick={signInAdmin}
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
