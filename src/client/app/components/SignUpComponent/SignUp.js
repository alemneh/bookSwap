import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';


class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      city: '',
      state: '',
      error: null
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleUsernameChange(e) {
      this.setState({ username: e.target.value });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleStateChange(e) {
    this.setState({ state: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }

  onCancelClick() {
    this.setState({
      username: '',
      password: '',
      city: '',
      state:''
    });
  }

  handleSignUp(e) {
    e.preventDefault();


    const username = this.state.username;
    const password = this.state.password;
    const city     = this.state.city;
    const state    = this.state.state;

    const validateLoginInput = this.validateLoginInput(username, password, city, state);

    if(validateLoginInput) {
      this.setState({ error: validateLoginInput })
      return;
    }


    axios.post(process.env.URL + '/signup', {
        name: this.state.username,
        password: this.state.password,
        city: this.state.city,
        state: this.state.state
    })
    .then((res) => {
      if(res.data.status == 'failure') {
        console.log(res);
        this.setState({ error: res.data.message })
      } else {
        browserHistory.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })
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


  validateLoginInput(username, password, city, state) {
    if(!username) {
      return 'Please enter username';
    } else if(!password) {
      return 'Please enter password';
    } else if(!city) {
      return 'Please enter city'
    } else if(!state) {
      return 'Please enter state'
    } else {
      return null;
    }
  }

  render() {
    return (
      <form className="form-horizontal">
      { this.renderError() }
        <fieldset>
          <legend>Register</legend>
          <div className="form-group">
            <label for="inputUsername" className="col-lg-2 control-label">Username</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputUsername"
                      placeholder="Username"  onChange={ this.handleUsernameChange }/>
            </div>
          </div>
          <div className="form-group">
            <label for="inputPassword" className="col-lg-2 control-label">Password</label>
            <div className="col-lg-10">
              <input type="password" className="form-control" id="inputPassword"
                      placeholder="Password" onChange={ this.handlePasswordChange }/>
            </div>
          </div>
          <div className="form-group">
            <label for="inputCity" className="col-lg-2 control-label">City</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputCity"
                      placeholder="City..."  onChange={ this.handleCityChange }/>
            </div>
          </div>
          <div className="form-group">
            <label for="inputState" className="col-lg-2 control-label">State</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputState"
                    placeholder="State..." onChange={ this.handleStateChange }/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default" onClick={ this.onCancelClick }>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={ this.handleSignUp }>Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }


}


export default SignUpComponent;
