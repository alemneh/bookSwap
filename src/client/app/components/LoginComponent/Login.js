import React from 'react';


const LoginComponent = ({
  handleUsernameChange,
  handlePasswordChange,
  onCancelClick,
  handleLogin
}) => {

  return (
    <form onSubmit={ handleLogin } className="form-horizontal">
      <fieldset>
        <legend>Log In</legend>
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
          <div className="col-lg-10 col-lg-offset-2">
            <button type="reset" className="btn btn-default" onClick={ onCancelClick }>Cancel</button>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  );

}


export default LoginComponent;
