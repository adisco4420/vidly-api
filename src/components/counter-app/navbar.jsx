import React from 'react'

const CounterNavbar = ({counterLength}) => {
    return ( 
        <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Navbar <span className="badge badge-dark">{counterLength}</span></span>
        </nav> 
        </React.Fragment>
        );
}
 
export default CounterNavbar;