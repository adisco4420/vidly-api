import React from "react";
import { Link,  NavLink, withRouter } from 'react-router-dom';

import { logout } from '../../services/auth'
const handleLogout = (props) => {
  logout();
  window.location = '/';
  // props.history.push('/auth/login');
}
const NavBar = ( props) => {
  const userDetail = props.userDetail;
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Vivdly</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/movies">Movies <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/customers">Customers</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/http-requests">Http Requests</NavLink>
      </li>
    </ul>
    <React.Fragment>
      {!userDetail ? 
          <ul className="navbar-nav ">
          <li className="nav-item">
          <NavLink className="nav-link" to="/auth/login">Login</NavLink>        
          </li>
          <li className="nav-item">
          <NavLink className="nav-link btn btn-primary text-light" to="/auth/register">Register</NavLink>        
          </li>
        </ul>: 
          <ul className="navbar-nav ">
          <li className="nav-item">
          <NavLink className="nav-link" to="/auth/profile">{userDetail.name}</NavLink>        
          </li>
          <li className="nav-item">
          <button className="nav-link btn btn-primary text-light" onClick={() => handleLogout(props)}>Logout</button>        
          </li>
        </ul>}
    </React.Fragment>

  </div>
</nav>
  );
};

export default withRouter(NavBar);
