import React from 'react';
import farmer from "./farmer.png";
import admin from "./admin.png";
import supplier from "./supplier.png";
import {BrowserRouter, Route, Link } from 'react-router-dom';
//import "./css/Home.css";



const Home = () => {
    
    return (
      <div className = "homi">
      
          
          
          <h1 className = "hi">FARMING ASSISTANCE WEB PORTAL </h1>  
      
          {/* <div class="custom-shape-divider-bottom-1632829953">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div> */}
       
        
        <div className="container">
    <div className="row">
      <div className="col-sm"><div class="card" >
    <img src= {admin} class="card-img-top" height = "200px" alt="..."/>
    <div class="card-body">
        
      <h5 class="card-title">ADMIN</h5>
      <div>Hello</div>
      <Link to = "/admin-signin" >
      <a href="#" class="btn btn-primary">Login</a>
      </Link>
    </div>
   
   
    
  </div>
  </div>
  
      <div className="col-sm"><div class="card" >
    <img src= {farmer} class="card-img-top" height = "200px" alt ="..." />
    <div class="card-body">
      <h5 class="card-title">FARMER</h5>
      <Link to = "/farmer-login" >
      <a href="#" class="btn btn-primary">Login</a>
      </Link>
    </div>
    <Link to = "/farmer-signup" >
      <a href="#" >New Farmer? Signup</a>
      </Link>
  </div></div>
      <div className="col-sm"><div class="card" >
    <img src= {supplier} class="card-img-top" height = "200px" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">SUPPLIER</h5>
      <Link to = "/supplier-login">
      <a href="#" class="btn btn-primary">Login</a>
      </Link>
    </div>
    <Link to = "/supplier-signup" >
      <a href="#" >New Supplier? Signup</a>
      </Link>
  </div></div>
    </div>
  </div>
      
      </div>
    )
  }
export default Home;  