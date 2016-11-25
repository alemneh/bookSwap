import React, { Component } from 'react';


class NavComponent extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="true">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">BK</a>
          </div>

          <div className="navbar-collapse collapse in" id="bs-example-navbar-collapse-1" aria-expanded="true">
            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Username..." />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password..." />
              </div>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavComponent;
