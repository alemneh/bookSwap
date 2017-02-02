import React, { PropTypes } from 'react';

const Info = ({
  user,
  isEditing,
  handleCityChange,
  handleStateChange,
  handleEmailChange,
  handlePhoneNumberChange,
  handleCheckBoxChange,
  handleUsernameChange,
  onCancelClick,
  onSaveClick,
  onEditClick
}) => {



  const renderInfoSection = () => {
    if(isEditing) {
      return (
        <div>
          <h3><b>Name:</b></h3>
          <input type="text" defaultValue={user.name}
                             onChange={ handleUsernameChange }
                             />
         <h3><b>Email:</b></h3>
         <input type="text" defaultValue={user.email}
                            onChange={ handleEmailChange }
                            />
        <h3><b>Phone Number:</b></h3>
        <input type="text" defaultValue={user.phoneNumber}
                           onChange={ handlePhoneNumberChange }
                           />
          <h3><b>City:</b></h3>
          <input type="text" defaultValue={user.city}
                             onChange={ handleCityChange }
                             />
          <h3><b>State:</b></h3>
          <input type="text" defaultValue={user.state}
                             onChange={ handleStateChange }
                             />
          <h3><b>Notifications:</b></h3>
          { (user.email_notification) ? <input type="checkbox" checked
                                        name='checkboxEmail'
                                        onChange={ handleCheckBoxChange }/> :
                                        <input type="checkbox"
                                        name='checkboxEmail'
                                        onChange={ handleCheckBoxChange }/> } Email
          <br />
          { (user.text_notification) ? <input type="checkbox" checked
                                       onChange={ handleCheckBoxChange }/> :
                                        <input type="checkbox"
                                        onChange={ handleCheckBoxChange }/> } Text
          <br />
          <a style={ {margin: '5px 5px 5px 0'} } onClick={ onCancelClick }
             href="#" className="btn btn-default">Cancel</a>
          <a style={ {margin: '5px 5px 5px 0'} } onClick={ onSaveClick }
             href="#" className="btn btn-primary">Save</a>
        </div>
      )
    }

    return (
      <div>
        <h3><b>Name:</b> <br /> {user.name}</h3>
        <h3><b>Email:</b> <br /> {user.email}</h3>
        <h3><b>Phone Number:</b> <br /> {user.phoneNumber}</h3>
        <h3><b>City:</b> <br /> {user.city}</h3>
        <h3><b>State:</b> <br /> {user.state}</h3>
        <h3><b>Notifications:</b> <br /></h3>
        { (user.email_notification) ? <input type="checkbox" disabled checked/> :
                                      <input type="checkbox" disabled /> } Email
        <br />
        { (user.text_notification) ? <input type="checkbox" disabled checked/> :
                                      <input type="checkbox" disabled /> } Text
        <br />
        <a onClick={ onEditClick } href="#" className="btn btn-primary">Edit</a>
      </div>
    )
  }


  return (
    <div className="tab-pane fade active in" id="info">
      { renderInfoSection() }
    </div>
  )

}

Info.propTypes = {
  user: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
}

export default Info;
