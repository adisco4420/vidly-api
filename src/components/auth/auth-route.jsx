import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Register from './register';

const AuthRoute = ({match}) => {
    return ( <React.Fragment>
        <Route exact path={`${match.path}/login`} component={Login} />
        <Route exact path={`${match.path}/register`} component={Register} />

    </React.Fragment> );
}
 
export default AuthRoute;