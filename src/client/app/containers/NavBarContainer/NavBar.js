import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import NavBar from '../../components/NavComponent/NavBar';
import { handleLogin, handleLogout } from '../../actions/loginActions';
import { copyUserNameInput, copyPasswordInput } from '../../actions/userActions'


class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleUsernameChange(e) {
    this.setState( {username: e.target.value});

    this.props.copyUserNameInput(e.target.value)
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value});

    this.props.copyPasswordInput(e.target.value})
  }

  handleLogin(e) {
      e.preventDefault();
      const { username, password } = this.state;
      const validateLoginInput = this.validateLoginInput(username, password);

      if(validateLoginInput) {
        this.setState({ error: validateLoginInput })
        return;
      }

      this.props.handleLogin(username, password);
  }

  handleLogout(e) {
      e.preventDefault();

      this.props.handleLogout();
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

  render() {
    const { user, token} = this.props;
    return(
      <div>
        <NavBar token={token}
                user={user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                handlePasswordChange={this.handlePasswordChange}
                handleUsernameChange={this.handleUsernameChange}/>
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    token: state.login.token,
    user: state.login.user
    username: state.user.newUserName,
    password: state.user.newPassword
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    handleLogin,
    handleLogout,
    copyUserNameInput,
    copyPasswordInput
   }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(NavContainer);
