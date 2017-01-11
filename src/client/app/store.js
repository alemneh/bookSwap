import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '.App';
import HomePage from './containers/HomePageContainer/HomePage';
import Profile from './containers/ProfileContainer/Profile';
import SignUp from './containers/SignUpContainer/SignUp';
import Trade from './containers/TradeContainer/Trade';
import BookPage from './containers/BookPageContainer/BookPage';






const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/profile" component={Profile} />
    <Route path="/signup"  component={SignUp}  />
    <Route path="/trade"   component={Trade}   />
    <Route path="/books"   component={BookPage} />
  </Route>
);

export default routes;
