import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Products from './components/routing/products';
// import Counter from './components/counter-app/counter';
// import HomeVid from './components/vivdy/HomeVid';
import Navbar from './components/routing/navbar';
import Home from './components/routing/home';
import Dashboard from './components/routing/admin/dashboard';
import Posts from './components/routing/posts';
import ProductDetails from './components/routing/productDetails'

function App() {
  return (
    // <Counter />
    // <HomeVid />
    <div>
    <Navbar />
    <div className="content">
      <Switch>
        <Route path="/products/:id" component={ProductDetails}/>
        <Route path="/products" render={(props) => <Products sortBy="newest" {...props}/>} />
        <Route path="/posts/:year?/:month?" component={Posts} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    
    </div>
    </div>
  );
}

export default App;
