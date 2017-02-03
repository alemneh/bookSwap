import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Login from '../../components/LoginComponent/Login';
import Alert from '../../components/AlertComponent/Alert';
import { handleLogin } from '../../actions/loginActions';
import { copyUserNameInput, copyPasswordInput, onCancelClick } from '../../actions/userActions'
import { setAlertMessage } from '../../actions/alertActions.js';


class LoginContainer extends Component {
  constructor(props) {
    super(props);


    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(e) {
    this.setState( {username: e.target.value});

    this.props.copyUserNameInput(e.target.value);
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value});

    this.props.copyPasswordInput(e.target.value);
  }

  handleLogin(e) {
    e.preventDefault();
    const { username, password, setAlertMessage } = this.props;
    const validateLoginInput = this.validateLoginInput(username, password);
    if(validateLoginInput) {
      setAlertMessage(validateLoginInput, true);
      return;
    }

    this.props.handleLogin(username, password);
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

  renderError() {
    const { error, message, setAlertMessage, loginError } = this.props;

    if(loginError) setAlertMessage(loginError.response.data.message, true);
    console.log(message);
    if(!message) { return null;}
    const styles = error ? 'alert alert-dismissible alert-danger' :
                           'alert alert-dismissible alert-success'
    window.setTimeout(() => {
      console.log('late hit');
      setAlertMessage('', false)
    }, 2000)

    return (
         <div className={styles}>
           <button type="button" className="close" data-dismiss="alert">&times;</button>
           {message}
         </div>
    )
  }

  render() {
    if(this.props.token) browserHistory.push('/profile');


    return (
      <section className="container">
        { this.renderError() }
        <Login  handleLogin={this.handleLogin}
                onCancelClick={ onCancelClick }
                handlePasswordChange={this.handlePasswordChange}
                handleUsernameChange={this.handleUsernameChange}/>

      </section>
    )
  }


}

function mapPropsToState(state) {
  return {
    username: state.user.newUserName,
    password: state.user.newPassword,
    token: state.login.token,
    error: state.alert.error,
    message: state.alert.message,
    loginError: state.login.error
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    copyPasswordInput,
    copyUserNameInput,
    onCancelClick,
    setAlertMessage,
    handleLogin
  }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(LoginContainer);
