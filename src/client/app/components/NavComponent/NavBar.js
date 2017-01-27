import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const NavComponent = ({
  user,
  token,
  handleLogin,
  handleLogout,
  toggleNavBar,
  slideToggleClass,
  handleUsernameChange,
  handlePasswordChange
}) => {


  let styles = {
    display: slideToggleClass
  }


  const renderNavBar = (slide) => {
    if(token) {
      return(
        <nav>
          <li style={styles}><Link  to="/">Home</Link></li>
          <li style={styles}><Link  to="/profile">Profile</Link></li>
          <li style={styles}><Link  to="/books">Browse Books</Link></li>
          <li style={styles}><a href="#" onClick={handleLogout}>Logout</a></li>
        </nav>
      )
    }
    return (

      <nav>
        <li style={styles}><Link  to="/">Home</Link></li>
        <li style={styles}><Link  to="/signup-form">Sign Up</Link></li>
        <li style={styles}><Link  to="/login-form">Log In</Link></li>
      </nav>
    )
  }

  return (
    <header id="header">
      <div id="logo">
        <img src="../resources/images/book-logo.png" alt="Book Swap Meet Logo" />
      </div>
        { renderNavBar() }
      <div id="ham-menu">
        <span onClick={ toggleNavBar } >☰</span>
      </div>
    </header>

  )

}

NavComponent.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleNavBar: PropTypes.func.isRequired,
  slideToggleClass: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default NavComponent;
