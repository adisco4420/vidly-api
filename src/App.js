import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import Products from './components/routing/products';
// import Counter from './components/counter-app/counter';
import HomeVid from './components/vivdy/HomeVid';
import Navbar from './components/routing/navbar';
import Home from './components/routing/home';
import Dashboard from './components/routing/admin/dashboard';
import Posts from './components/routing/posts';
import ProductDetails from './components/routing/productDetails'
import Customers from './components/vivdy/customers';
import Rentals from './components/vivdy/rentals';
import NotFound from './components/vivdy/not-found';
import MovieDetail from './components/vivdy/movie-detail';
import AuthRoute from './components/auth/auth-route';
import NewMovie from './components/vivdy/new-movie';
import HttpRequest from './components/http-requests/http';
import { getCurrentUser } from './services/auth'
import ProtectedRoute from './components/routing/protectedRoute';




class App extends Component {
  state = { 
    userDetail: null
   }
   componentDidMount() {
    this.setState({userDetail: getCurrentUser()})
   }
   
  render() { 
    const { userDetail} = this.state;    
    return (
      // <Counter />
      // <HomeVid />
      <React.Fragment>
      <ToastContainer />
      <Navbar userDetail={userDetail}  />
      <div className="container">
        <Switch>
          <Route path="/http-requests" component={HttpRequest}/>
          <Route path="/auth" render={(props) => <AuthRoute {...props} />}/>
          <ProtectedRoute path="/movies/new" component={NewMovie} />
          <Route path="/movies/:id" component={MovieDetail}/>
          <Route path="/movies" component={HomeVid}/>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
  
          <Redirect from="/" exact to="/movies" />
          <Redirect  to="/not-found" />
  
        </Switch> 
      
      </div>
      </React.Fragment>
    );
  }
}
 
export default App;
