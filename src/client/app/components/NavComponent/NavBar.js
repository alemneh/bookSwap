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

  let slideClass = '';

  const slideToggle = () => {

  }

  const renderNavBar = (slide) => {
    if(token) {
      return(
        <nav>
          <li><Link  to="/">Home</Link></li>
          <li><Link  to="/profile">Profile</Link></li>
          <li><Link  to="/books">Browse Books</Link></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </nav>
      )
    }
    return (

      <nav >
        <li><Link  to="/">Home</Link></li>
        <li className={slide} ><Link  to="/signup-form">Sign Up</Link></li>
        <li><Link  to="/login-form">Log In</Link></li>
      </nav>
    )
  }

  return (
    <header id="header">
      <div id="logo">
        <img src="../resources/images/book-logo.png" alt="Book Swap Meet Logo" />
      </div>
        { renderNavBar(slideClass) }
      <div id="ham-menu">
        <span onClick={() => { slideClass= 'hide'; console.log(slideClass);}} href="#">☰</span>
      </div>
    </header>

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
