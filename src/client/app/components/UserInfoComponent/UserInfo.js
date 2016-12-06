import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      name: '',
      city: '',
      state: ''
    }
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleCityChange(e) {
      this.setState({ city: e.target.value });
  }

  handleStateChange(e) {
    this.setState({ state: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ name: e.target.value });
  }

  renderInfoSection() {
    if(this.state.isEditing) {
      return (
        <div>
          <h3><b>NAME:</b></h3>
          <input type="text" defaultValue={this.props.user.name}
                             onChange={ this.handleUsernameChange }
                             />
          <h3><b>CITY:</b></h3>
          <input type="text" defaultValue={this.props.user.city}
                             onChange={this.handleCityChange }
                             />
          <h3><b>STATE:</b></h3>
          <input type="text" defaultValue={this.props.user.state}
                             onChange={this.handleStateChange }
                             /> <br />
          <a style={ {margin: '5px 5px 5px 0'} } onClick={ this.onCancelClick.bind(this) } href="#" className="btn btn-default">Cancel</a>
          <a style={ {margin: '5px 5px 5px 0'} } onClick={this.onSaveClick.bind(this) } href="#" className="btn btn-primary">Save</a>
        </div>
      )
    }

    return (
      <div>
        <h3><b>NAME:</b> <br /> {this.props.user.name}</h3>
        <h3><b>CITY:</b> <br /> {this.props.user.city}</h3>
        <h3><b>STATE:</b> <br /> {this.props.user.state}</h3>
        <a onClick={ this.onEditClick.bind(this) } href="#" className="btn btn-primary">Edit</a>
      </div>
    )
  }

  _handelUserUpdates(updatedUser) {

  }

  onEditClick() {
    this.setState( { isEditing: true});
  }

  onCancelClick() {
    this.setState( { isEditing: false });
  }

  onSaveClick(e) {
    e.preventDefault();
    const updatedUser = {
      name: this.state.name ? this.state.name : this.props.user.name,
      city: this.state.city ? this.state.city : this.props.user.city,
      state: this.state.state ? this.state.state : this.props.user.state
    }
    this.props.handleUpdateOnUser(updatedUser);
    this.setState({ isEditing: false });
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
