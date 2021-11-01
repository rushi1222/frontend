import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupplierAction,
  updateSupplierAction,
  updateRenderAction,
} from "../redux/SupplierReducer";
import { AppNav } from "./AppNav";
import { adminsignOutAction } from "../redux/AdminLoginReducer";

export const SupplierUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [suppliername, setSuppliername] = useState(state.supplier.uref.suppliername);
  const [supplieraddress, setSupplieraddress] = useState(state.supplier.uref.supplieraddress);
  const [supmobileno, setSupmobileno] = useState(state.supplier.uref.supmobileno);
  
  

  const updateSuppliername = (e) => setSuppliername(e.target.value);
  const updateSupplieraddress = (e) => setSupplieraddress(e.target.value);
  const updateSupmobileno = (e) => setSupmobileno(e.target.value);
  

  const addNewSupplier = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createSupplierAction({
            suppliername,
            supplieraddress,
            supmobileno,
        })
      );

      // clear the form
      setSuppliername("");
      setSupplieraddress("");
      setSupmobileno("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateSupplier = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateSupplierAction({
          id: state.supplier.uref.supplierid,
          suppliername,
            supplieraddress,
            supmobileno,
        })
      );

      // clear the form
      setSuppliername("");
      setSupplieraddress("");
      setSupmobileno("");
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

    setSuppliername("");
    setSupplieraddress("");
    setSupmobileno("");
  };

  return (
    <div className=" p-4" style={{ backgroundColor: "antiquewhite" }}>
      <div>
        <div style={{ background: "" }}>
          
          <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">
            <Link to="/supplier-list">
              <h6 className="mr-3">SUPPLIER-LIST</h6>
            </Link>

            {/* <Link to="/farmer-list">
              <h6 className="mr-3">FARMER-LIST</h6>
            </Link> */}
{/* 
            <Link to="/loginDetails-list">
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
                {state.supplier.uref.supplierid ? (
                  <h3>
                    <center>UPDATE SUPPLIER DETAILS</center>
                  </h3>
                  ) : (
                    <h3>
                      <center>ADD NEW SUPPLIER</center>
                    </h3>
                )}
              </div>
            </center>

            {state.supplier.progress && (
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
                  <h4>Supplier Name</h4>
                  <input
                    type="text"
                    value={suppliername}
                    onChange={updateSuppliername}
                    className="form-control form-control-lg mb-1 w-50"
                    placeholder="Enter Supplier's Name"
                    minLength="3"
                    maxLength="30"
                    required
                  />
                  <div>
                    <h4>Address</h4>
                    <input
                      type="text"
                      value={supplieraddress}
                      onChange={updateSupplieraddress}
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
                      value={supmobileno}
                      onChange={updateSupmobileno}
                      className="form-control form-control-lg mb-1  w-50"
                      placeholder="Enter Your Contact No."
                      minLength="10"
                      maxLength="10"
                      required
                    />
                  </div>
                 
                  
                  <div>
                    {state.supplier.uref.supplierid ? (
                      <input
                        type="button"
                        onClick={updateSupplier}
                        value="Update Supplier"
                        className="btn btn-lg btn-primary w-50"
                      />
                     ) : (
                        <input
                          type="button"
                          onClick={addNewSupplier}
                          value="Add Supplier"
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
