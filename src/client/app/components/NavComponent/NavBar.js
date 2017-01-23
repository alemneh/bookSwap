import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const NavComponent = ({
  user,
  token,
  handleLogin,
  handleLogout,
  handleUsernameChange,
  handlePasswordChange
}) => {

  const renderNavBar = () => {
    if(token) {
      return(
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="#" className="navbar-brand" to="/">BK</Link>
          </div>
          <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1" aria-expanded="false" style={{height: "1px"}}>
            <ul className="nav navbar-nav navbar-right">
              <li><Link  to="/profile">Profile</Link></li>
              <li><Link  to="/books">Browse Books</Link></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>

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
            <Link to="/" className="navbar-brand" href="#">BK</Link>
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

  return (
    <div>
      <nav className="navbar navbar-default">
        { renderNavBar() }
      </nav>
    </div>

  )

}

NavComponent.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default NavComponent;
