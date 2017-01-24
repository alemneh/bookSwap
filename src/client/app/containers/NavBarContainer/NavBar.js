import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import NavBar from '../../components/NavComponent/NavBar';
import Alert from '../../components/AlertComponent/Alert';
import { handleLogin, handleLogout } from '../../actions/loginActions';
import { copyUserNameInput, copyPasswordInput } from '../../actions/userActions'
import { setAlertMessage } from '../../actions/alertActions.js';


class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      inputError: null
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(nextProps.user) {
      browserHistory.push('/books');
    }
  }

  handleUsernameChange(e) {
    this.setState( {username: e.target.value});

    this.props.copyUserNameInput(e.target.value)
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value});

    this.props.copyPasswordInput(e.target.value)
  }

  handleLogin(e) {
      e.preventDefault();
      const { username, password, setAlertMessage } = this.props;
      const validateLoginInput = this.validateLoginInput(username, password);
      if(validateLoginInput) {
        setAlertMessage(validateLoginInput);
        return;
      }

      this.props.handleLogin(username, password);
  }

  handleLogout(e) {
      e.preventDefault();

      this.props.handleLogout();
  }

  renderAlert() {

    const { success, error, inputError, isError, setAlertMessage } = this.props;
    if(success) {
      setAlertMessage(success, false);
    } else if(error) {
      setAlertMessage(error.response.data.message, true);
    } else if (inputError) {
      setAlertMessage(inputError, true);
    } else {
      return;
    }


    return (
      <div>
        <Alert message={inputError }
               error={isError} />
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

  render() {
    const { user, token, error} = this.props;
    return(
      <div>
        <NavBar token={token}
                user={user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                handlePasswordChange={this.handlePasswordChange}
                handleUsernameChange={this.handleUsernameChange}/>

                {/* { this.renderAlert() } */}
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    username: state.user.newUserName,
    password: state.user.newPassword,
    error: state.login.error,
    success: state.login.success,
    inputError: state.alert.message,
    isError: state.alert.error
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    handleLogin,
    handleLogout,
    copyUserNameInput,
    copyPasswordInput,
    setAlertMessage
   }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(NavContainer);
