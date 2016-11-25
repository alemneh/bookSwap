import React, { Component } from 'react';

class SignUpComponent extends Component {
  render() {
    return (
      <form className="form-horizontal">
        <fieldset>
          <legend>Register</legend>
          <div className="form-group">
            <label for="inputEmail" className="col-lg-2 control-label">Email</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputEmail" placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <label for="inputPassword" className="col-lg-2 control-label">Password</label>
            <div className="col-lg-10">
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <label for="inputCity" className="col-lg-2 control-label">City</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputCity" placeholder="City..." />
            </div>
          </div>
          <div className="form-group">
            <label for="inputState" className="col-lg-2 control-label">State</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputState" placeholder="State..." />
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SignUpComponent;
