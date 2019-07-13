import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth'


const ProtectedRoute = ({path, component: Component, render}) => {
    return ( <Route path={path} render={props => {
        if(!getCurrentUser()) return <Redirect to={{
            pathname:"/auth/login",
            state: {from: props.location}
        }}  />
        return Component ?  <Component {...props} /> : render(props)
      }
    } /> );
}
 
export default ProtectedRoute;