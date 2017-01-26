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
  copyPhoneNumberInput,
  emailCheckboxClick,
  textCheckboxClick,
  onCancelClick,
  copyEmailInput
} from '../../actions/userActions';


class SignUpContianer extends Component {
  constructor(props) {
    super(props);

    this.handleUsernameChange    = this.handleUsernameChange.bind(this);
    this.handleEmailChange       = this.handleEmailChange.bind(this);
    this.handlePasswordChange    = this.handlePasswordChange.bind(this);
    this.handleCityChange        = this.handleCityChange.bind(this);
    this.handleStateChange       = this.handleStateChange.bind(this);
    this.handleCheckBoxChange    = this.handleCheckBoxChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSignUp            = this.handleSignUp.bind(this);
  }

  handleUsernameChange(e) {

    this.props.copyUserNameInput(e.target.value)
  }

  handleEmailChange(e) {

    his.props.copyEmailInput(e.target.value)
  }

  handlePhoneNumberChange(e) {

    this.props.copyPhoneNumberInput(e.target.value);
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

  handleCheckBoxChange(e) {
    const { emailCheckboxClick, textCheckboxClick } = this.props;
    if(e.target.name === 'checkboxEmail') {
      emailCheckboxClick();
      return;
    }
    textCheckboxClick();
  }




  handleSignUp(e) {
    e.preventDefault();
    let {
      name,
      email,
      password,
      city,
      state,
      signUp,
      phoneNumber,
      email_notification,
      text_notification } = this.props;

    const newUser = {
      name,
      email,
      password,
      city,
      state,
      phoneNumber,
      email_notification,
      text_notification
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
    } else if(!newUser.phoneNumber) {
      return 'Please enter phone number'
    } else if(!newUser.city) {
      return 'Please enter city'
    } else if(!newUser.state) {
      return 'Please enter state'
    } else {
      return null;
    }
  }

  render() {
    return (
      <section className='container'>
        <Signup handleSignUp={ this.handleSignUp }
                handleUsernameChange={ this.handleUsernameChange }
                handleEmailChange={ this.handleEmailChange }
                handleCityChange={ this.handleCityChange }
                handleStateChange={ this.handleStateChange }
                onCancelClick={ this.props.onCancelClick }
                handlePhoneNumberChange={ this.handlePhoneNumberChange }
                handleCheckBoxChange={ this.handleCheckBoxChange}
                handlePasswordChange={ this.handlePasswordChange }/>
      </section>
    )
  }

}

function mapPropsToState(state) {
  return {
    name: state.user.newUserName,
    email: state.user.newEmail,
    password: state.user.newPassword,
    city: state.user.newCity,
    state: state.user.newState,
    phoneNumber: state.user.newPhoneNumber,
    email_notification: state.user.email_notification,
    text_notification: state.user.text_notification
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    copyUserNameInput,
    copyPasswordInput,
    copyCityInput,
    copyEmailInput,
    copyPhoneNumberInput,
    emailCheckboxClick,
    textCheckboxClick,
    signUp,
    copyStateInput,
    onCancelClick
  }, dispatch)
}


export default connect(mapPropsToState, matchDispatchToProps)(SignUpContianer);
