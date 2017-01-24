import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signup from '../../components/SignUpComponent/SignUp';
import { signUp } from '../../actions/loginActions';
import {
  copyUserNameInput,
  copyPasswordInput,
  copyCityInput,
  copyStateInput,
  onCancelClick,
  copyEmailInput
} from '../../actions/userActions';


class SignUpContianer extends Component {
  constructor(props) {
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleUsernameChange(e) {

      this.props.copyUserNameInput(e.target.value)
  }

  handleEmailChange(e) {

      this.props.copyEmailInput(e.target.value)
  }

  handleCityChange(e) {

    this.props.copyCityInput(e.target.value);
  }

  handleStateChange(e) {

    this.props.copyStateInput(e.target.value);
  }

  handlePasswordChange(e) {

    this.props.copyPasswordInput(e.target.value);
  }



  handleSignUp(e) {
    e.preventDefault();
    let { name, email, password, city, state, signUp } = this.props;

    const newUser = {
      name,
      email,
      password,
      city,
      state
    }

    const validateLoginInput = this.validateLoginInput(newUser);

    if(validateLoginInput) {

      return;
    }



    signUp(newUser);

  }



  validateLoginInput(newUser) {
    if(!newUser.name) {
      return 'Please enter username';
    } else if(!newUser.password) {
      return 'Please enter password';
    } else if(!newUser.city) {
      return 'Please enter city'
    } else if(!newUser.state) {
      return 'Please enter state'
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className='container'>
        <Signup handleSignUp={ this.handleSignUp }
                handleUsernameChange={ this.handleUsernameChange }
                handleEmailChange={ this.handleEmailChange }
                handleCityChange={ this.handleCityChange }
                handleStateChange={ this.handleStateChange }
                onCancelClick={ this.props.onCancelClick }
                handlePasswordChange={ this.handlePasswordChange }/>
      </div>
    )
  }

}

function mapPropsToState(state) {
  return {
    name: state.user.newUserName,
    email: state.user.newEmail,
    password: state.user.newPassword,
    city: state.user.newCity,
    state: state.user.newState
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    copyUserNameInput,
    copyPasswordInput,
    copyCityInput,
    copyEmailInput,
    signUp,
    copyStateInput,
    onCancelClick
  }, dispatch)
}


export default connect(mapPropsToState, matchDispatchToProps)(SignUpContianer);
