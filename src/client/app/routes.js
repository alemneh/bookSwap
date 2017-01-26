import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './components/HomePageComponent/HomePage';
import Profile from './containers/ProfileContainer/Profile';
import SignUp from './containers/SignupContainer/Signup';
import Login from './containers/LoginContainer/Login';
import BookPage from './containers/BookPageContainer/BookPage';






const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login-form"   component={Login}  />
    <Route path="/profile" component={Profile} />
    <Route path="/signup-form"  component={SignUp}  />
    <Route path="/books"   component={BookPage} />
  </Route>
);

export default routes;
