import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './components/HomePageComponent/HomePage';
import Profile  from './components/ProfileComponent/Profile';
import SignUp   from './components/SignUpComponent/SignUp';
import Trade    from './components/TradeComponent/Trade';


render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup"  component={SignUp}  />
      <Route path="/trade"   component={Trade}   />
    </Route>
  </Router>, document.getElementById('app'));
