import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';


class NavComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderError() {

  }

  renderNavBar() {
    const {
      user,
      token,
      handleLogin,
      handleLogout,
      handleUsernameChange,
      handlePasswordChange
    } = this.props;

    if(token) {
      return(
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="true">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/"><a className="navbar-brand" href="#">BK</a></Link>

            </div>

            <div className="navbar-collapse collapse in" id="bs-example-navbar-collapse-1" aria-expanded="true">

              <form className="navbar-form navbar-right" role="search">
                <div>
                <a  >Welcome, { user.name }</a>
                <Link className="btn btn-default" to="/profile">Profile</Link>
                <Link className="btn btn-default" to="/books">Browse Books</Link>
                <button type="submit" className="btn btn-default" onClick={handleLogout}>Logout</button>
                </div>
              </form>
            </div>
          </div>
      )
    }
    return (
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="true">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/"><a className="navbar-brand" href="#">BK</a></Link>
          </div>

          <div className="navbar-collapse collapse in" id="bs-example-navbar-collapse-1" aria-expanded="true">
            <form className="navbar-form navbar-right" role="search">
              <div>
              <div className="form-group">
                <input type="text" className="form-control"
                      placeholder="Username..."  onChange={ handleUsernameChange }/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control"
                      placeholder="Password..." onChange={ handlePasswordChange }/>
              </div>
              <button type="submit" className="btn btn-default" onClick={ handleLogin }>Login</button>
              </div>
            </form>
          </div>
        </div>
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          { this.renderNavBar() }
        </nav>
        { this.renderError() }
      </div>

    )
  }

}

export default NavComponent;
