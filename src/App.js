import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { FarmerLogin } from "./pages/FarmerLogin";
import { AppNav } from "./pages/AppNav";
import { AdminLogin } from "./pages/AdminLogin";
import { SupplierLogin } from "./pages/SupplierLogin";
import { FarmerHome } from "./pages/FarmerHome";
import { SupplierHome } from "./pages/SupplierHome";
import { AdminHome } from "./pages/AdminHome";
import { FarmerList } from "./pages/FarmerList";
import { SupplierList } from "./pages/SupplierList";
import { LoginDetailsList } from "./pages/LoginDetailsList";
import { FarmerUpdate } from "./pages/FarmerUpdate";
import { SupplierUpdate } from "./pages/SupplierUpdate";
import { LoginDetailsUpdate } from "./pages/LoginDetailsUpdate";
import { FarmerSignup } from "./pages/FarmerSignup";
import { SupplierSignup } from "./pages/SupplierSignup";
import  Home  from "./pages/Home";
//import { UserList } from "./pages/UserList";
//import { UserUpsert } from "./pages/UserUpsert";


function App() {
  const history = useHistory();

  const authSuccessFromStorage = localStorage.getItem("authSuccess");
  if (authSuccessFromStorage !== "1") {
    history.push("/");
  }

  return (
    <>
      {authSuccessFromStorage === "1"}

      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/admin-signin" component={AdminLogin} />
      <Route exact path="/farmer-login" component={FarmerLogin} />
      <Route exact path="/supplier-login" component={SupplierLogin} />
      <Route exact path="/farmer-home" component={FarmerHome} />
      <Route exact path="/supplier-home" component={SupplierHome} />
      <Route exact path="/admin-home" component={AdminHome} />
      <Route exact path="/supplier-list" component={SupplierList} />
      <Route exact path="/loginDetails-list" component={LoginDetailsList} />
      <Route exact path="/farmer-list" component={FarmerList} />
      <Route exact path="/farmer-update" component={FarmerUpdate} />
      <Route exact path="/supplier-update" component={SupplierUpdate} />
      <Route exact path="/logindetails-update" component={LoginDetailsUpdate} />
      <Route exact path="/farmer-signup" component={FarmerSignup} />
      <Route exact path="/supplier-signup" component={SupplierSignup} />


    

      {/* <Route exact path="/home-page" component={Home} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/contact-us" component={ContactUs} />

      <Route exact path="/user-list" component={UserList} />
      <Route exact path="/user-upsert" component={UserUpsert} /> */}

     
    </>
  );
}

export default App;
