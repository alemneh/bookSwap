import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import NavBar from '../../components/NavComponent/NavBar';
import { handleLogin } from '../../actions/loginActions';


class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState( {username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value});
  }

  handleLogin(e) {
      e.preventDefault();
      console.log(this);
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
      localStorage.removeItem('reduxState');

      browserHistory.push('/');
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
                handleLogin={this.handleLogin.bind(this)}
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
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ handleLogin }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(NavContainer);
