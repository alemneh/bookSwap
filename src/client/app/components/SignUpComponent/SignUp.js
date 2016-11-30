import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      city: '',
      state: ''
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
    let newUser = [
      {
        name: this.state.username,
        password: this.state.password,
        city: this.state.city,
        state: this.state.state
      }
    ]

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
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form className="form-horizontal">
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
