import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Products from './components/routing/products';
// import Counter from './components/counter-app/counter';
// import HomeVid from './components/vivdy/HomeVid';
import Navbar from './components/routing/navbar';
import Home from './components/routing/home';
import Dashboard from './components/routing/admin/dashboard';
import Posts from './components/routing/posts'

function App() {
  return (
    // <Counter />
    // <HomeVid />
    <div>
    <Navbar />
    <div className="content">
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/posts" component={Posts} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    
    </div>
    </div>
  );
}

export default App;
