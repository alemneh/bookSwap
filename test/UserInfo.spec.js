import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


import UserInfo from '../src/client/app/components/UserInfoComponent/UserInfo'

let wrapper, Props;
const props = {
  user: {},
  isEditing: false,
  handleCityChange: () => {},
  handleStateChange: () => {},
  handleUsernameChange: () => {},
  onCancelClick: () => {},
  onSaveClick: () => {},
  onEditClick: () => {}
}

describe('<UserInfo />', () => {
  beforeEach(() => {
    wrapper = shallow(<UserInfo {...props}/>);

    Props = wrapper.unrendered.props;
  });

  it('should render', () => {
    expect(wrapper).to.exist
  });

  it('should have a boolean isEditing prop', () => {
    const { isEditing } = Props;
    expect(isEditing).to.be.defiend
    expect(isEditing).to.be.an('Boolean');
  });


  it('should have an object user prop', () => {
    const { user } = Props;
    expect(user).to.be.defiend
    expect(user).to.be.an('Object');
  });

  it('should have an function handleCityChange prop', () => {
    const { handleCityChange } = Props;
    expect(handleCityChange).to.be.defiend
    expect(handleCityChange).to.be.an('Function');
  });

  it('should have a function handleStateChange prop', () => {
    const { handleStateChange } = Props;
    expect(handleStateChange).to.be.defiend
    expect(handleStateChange).to.be.an('Function');
  });

  it('should have a function handleUsernameChange prop', () => {
    const { handleUsernameChange } = Props;
    expect(handleUsernameChange).to.be.defiend
    expect(handleUsernameChange).to.be.an('Function');
  });

  it('should have a function onCancelClick prop', () => {
    const { onCancelClick } = Props;
    expect(onCancelClick).to.be.defiend
    expect(onCancelClick).to.be.an('Function');
  });

  it('should have a function onSaveClick prop', () => {
    const { onSaveClick } = Props;
    expect(onSaveClick).to.be.defiend
    expect(onSaveClick).to.be.an('Function');
  });

  it('should have a function onEditClick prop', () => {
    const { onEditClick } = Props;
    expect(onEditClick).to.be.defiend
    expect(onEditClick).to.be.an('Function');
  });

});
