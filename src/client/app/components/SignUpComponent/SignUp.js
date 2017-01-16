import React from 'react';


const SignUpComponent = ({
  handleUsernameChange,
  handlePasswordChange,
  handleCityChange,
  handleStateChange,
  onCancelClick,
  password,
  state,
  city,
  name
}) => {

  return (
    <form className="form-horizontal">
      <fieldset>
        <legend>Register</legend>
        <div className="form-group">
          <label for="inputUsername" className="col-lg-2 control-label">Username</label>
          <div className="col-lg-10">
            <input type="text" className="form-control" id="inputUsername"
                    placeholder="Username"  onChange={ handleUsernameChange }/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputPassword" className="col-lg-2 control-label">Password</label>
          <div className="col-lg-10">
            <input type="password" className="form-control" id="inputPassword"
                    placeholder="Password" onChange={ handlePasswordChange }/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputCity" className="col-lg-2 control-label">City</label>
          <div className="col-lg-10">
            <input type="text" className="form-control" id="inputCity"
                    placeholder="City..."  onChange={ handleCityChange }/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputState" className="col-lg-2 control-label">State</label>
          <div className="col-lg-10">
            <input type="text" className="form-control" id="inputState"
                  placeholder="State..." onChange={ handleStateChange }/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            <button type="reset" className="btn btn-default" onClick={ onCancelClick }>Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={ handleSignUp }>Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  );

}


export default SignUpComponent;
