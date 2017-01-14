import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);

  }


  renderInfoSection() {
    const {
      user,
      isEditing,
      handleCityChange,
      handleStateChange,
      handleUsernameChange,
      onCancelClick,
      onSaveClick,
      onEditClick
    } = this.props;

    if(isEditing) {
      return (
        <div>
          <h3><b>NAME:</b></h3>
          <input type="text" defaultValue={user.name}
                             onChange={ handleUsernameChange }
                             />
          <h3><b>CITY:</b></h3>
          <input type="text" defaultValue={user.city}
                             onChange={ handleCityChange }
                             />
          <h3><b>STATE:</b></h3>
          <input type="text" defaultValue={user.state}
                             onChange={ handleStateChange }
                             /> <br />
          <a style={ {margin: '5px 5px 5px 0'} } onClick={ onCancelClick }
             href="#" className="btn btn-default">Cancel</a>
          <a style={ {margin: '5px 5px 5px 0'} } onClick={ onSaveClick }
             href="#" className="btn btn-primary">Save</a>
        </div>
      )
    }

    return (
      <div>
        <h3><b>NAME:</b> <br /> {user.name}</h3>
        <h3><b>CITY:</b> <br /> {user.city}</h3>
        <h3><b>STATE:</b> <br /> {user.state}</h3>
        <a onClick={ onEditClick } href="#" className="btn btn-primary">Edit</a>
      </div>
    )
  }



  render() {
    return (
      <div className="tab-pane fade active in" id="info">
        { this.renderInfoSection() }
      </div>
    )
  }
}

export default Info;
