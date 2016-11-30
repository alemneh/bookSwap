import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';


class NavComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      token: '',
      user: '',
      error: null
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.handleSignUp = this.handleSignUp.bind(this);
  }

  renderError() {
    if(!this.state.error) { return null;}

    window.setTimeout(() => {
      this.setState({ error: null});
    }, 2000)

    return <div className="alert alert-dismissible alert-danger">
             <button type="button" className="close" data-dismiss="alert">&times;</button>
             {this.state.error}
           </div>
  }

  handleUsernameChange(e) {
    this.setState( {username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value});
  }

  handleLogin(e) {
      e.preventDefault();
      const username = this.state.username;
      const password = this.state.password;
      const validateLoginInput = this.validateLoginInput(username, password);

      if(validateLoginInput) {
        this.setState({ error: validateLoginInput })
        return;
      }

      this._logIn(username, password);
  }

  handleLogout(e) {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        token: '',
        user: '',
        username: '',
        password: ''
      });
      browserHistory.push('/');
  }

  _logIn(username, password) {
    let token, user;
    axios.get(process.env.URL + '/login', {
      auth: {
        username,
        password
      }
    })
    .then((res) => {
      token = res.data.token;
      user = JSON.stringify(res.data.data);
      if(res.data.status == 'failure') {
        localStorage.removeItem('token');
        this.setState({ error: res.data.message});
      } else {
        localStorage.token = token;
        localStorage.user = user;
        this.setState(
          {
            token,
            user,
            error: null,
            isLoggedIn: true
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }



  renderNavBar() {
    if(localStorage.token) {
      const user = JSON.parse(localStorage.user);
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
                <button type="button" disabled>Welcome, { user.name }</button>
                <button type="submit" className="btn btn-default"><Link to="/profile">Profile</Link></button>
                <button type="submit" className="btn btn-default" onClick={this.handleLogout}>Logout</button>
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
              <div className="form-group">
                <input type="text" className="form-control"
                      placeholder="Username..."  onChange={ this.handleUsernameChange }/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control"
                      placeholder="Password..." onChange={ this.handlePasswordChange }/>
              </div>
              <button type="submit" className="btn btn-default" onClick={ this.handleLogin }>Login</button>
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

  validateLoginInput(username, password) {
    if(!username) {
      return 'Please enter username';
    } else if(!password) {
      return 'Please enter password';
    } else {
      return null;
    }
  }
}

export default NavComponent;
