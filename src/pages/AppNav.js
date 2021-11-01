import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/FarmerReducer";

export const AppNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearUserURef = () => {
   dispatch(updateRenderAction({}));
    history.push("/farmer-update");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto"></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
