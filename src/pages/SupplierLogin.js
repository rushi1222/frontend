import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateSupplierAction } from "../redux/SupplierLoginReducer";

import { AppNav } from "./AppNav";

export const SupplierLogin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [supname, setSupname] = useState("");
  const [spwd, setSpwd] = useState("");
  const srole = "SUPPLIER";

  const updateSupname = (e) => setSupname(e.target.value);
  const updateSpwd = (e) => setSpwd(e.target.value);

  const signInSupplier = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      dispatch(authenticateSupplierAction({ username : supname , pwd : spwd, role : srole }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  //Admin signed in
  console.log(state.supplierlogin.authSuccess);
  if (state.supplierlogin.authSuccess === true) {
    // Redirecting the user /farmer-list page;
    
    history.push("/supplier-home");
  }

  return (
    <div className="bgimage">
      <div className=" justify-content-center align-items-center">
       

        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-50">
            <h1 className="text-center alert alert-info">SUPPLIER SIGN IN</h1>

            {state.supplierlogin.authFailure && (
              <h6 className="text-center alert alert-danger">
                Invalid Credentials !!
              </h6>
            )}

            <form ref={formEl} className="needs-validation" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={supname}
                  onChange={updateSupname}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={spwd}
                  onChange={updateSpwd}
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
                  value={srole}
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>
              <div>
                <input
                  type="button"
                  value="LOGIN"
                  onClick={signInSupplier}
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
