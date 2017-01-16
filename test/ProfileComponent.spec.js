import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


import Profile from '../src/client/app/components/ProfileComponent/Profile'

let wrapper, Props;
const props = {
  user: {},
  isEditing: false,
  search: '',
  book2Remove: {},
  userBooks: [],
  pendingTrades: [],
  tradeRequests: [],
  _queryBook2Add: () => {},
  viewTrade: () => {},
  trade: {},
  _removeBookFromUser: () => {},
  onEditClick: () => {},
  onCancelClick: () => {},
  onSaveClick: () => {},
  handleUsernameChange: () => {},
  handleStateChange: () => {},
  handleCityChange: () => {},
  handleUpdateOnUser: () => {},
  handleAcceptTrade: () => {},
  handleDeclineTrade: () => {},
  handleBookSearchChange: () => {},
  handleRemoveBook: () => {}
}

describe('<ProfileComponent />', () => {
  beforeEach(() => {
    wrapper = shallow(<Profile {...props}/>);

    Props = wrapper.unrendered.props;
  });

  it('should render', () => {
    expect(wrapper).to.exist
  });

  it('should have an array of userBooks prop', () => {
    const { userBooks } = Props;
    expect(userBooks).to.be.defiend
    expect(userBooks).to.be.an('Array');
  });

  it('should have a Boolean isEditing prop', () => {
    const { isEditing } = Props;
    expect(isEditing).to.be.defiend
    expect(isEditing).to.be.an('Boolean');
  });

  it('should have a function _queryBook2Add prop', () => {
    const { _queryBook2Add } = Props;
    expect(_queryBook2Add).to.be.defiend
    expect(_queryBook2Add).to.be.an('Function');
  });

  it('should have a string search prop', () => {
    const { search } = Props;
    expect(search).to.be.defiend
    expect(search).to.be.an('String');
  });

  it('should have an object book2Remove prop', () => {
    const { book2Remove } = Props;
    expect(book2Remove).to.be.defiend
    expect(book2Remove).to.be.an('Object');
  });

  it('should have an array pendingTrades prop', () => {
    const { pendingTrades } = Props;
    expect(pendingTrades).to.be.defiend
    expect(pendingTrades).to.be.an('Array');
  });

  it('should have an array tradeRequests prop', () => {
    const { tradeRequests } = Props;
    expect(tradeRequests).to.be.defiend
    expect(tradeRequests).to.be.an('Array');
  });

  it('should have a function onBookSelect prop', () => {
    const { viewTrade } = Props;
    expect(viewTrade).to.be.defiend
    expect(viewTrade).to.be.an('Function');
  });

  it('should have an object trade prop', () => {
    const { trade } = Props;
    expect(trade).to.be.defiend
    expect(trade).to.be.an('Object');
  });

  it('should have a function _removeBookFromUser prop', () => {
    const { _removeBookFromUser } = Props;
    expect(_removeBookFromUser).to.be.defiend
    expect(_removeBookFromUser).to.be.an('Function');
  });

  it('should have a function onEditClick prop', () => {
    const { onEditClick } = Props;
    expect(onEditClick).to.be.defiend
    expect(onEditClick).to.be.an('Function');
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

  it('should have a function handleUsernameChange prop', () => {
    const { handleUsernameChange } = Props;
    expect(handleUsernameChange).to.be.defiend
    expect(handleUsernameChange).to.be.an('Function');
  });

  it('should have a function handleStateChange prop', () => {
    const { handleStateChange } = Props;
    expect(handleStateChange).to.be.defiend
    expect(handleStateChange).to.be.an('Function');
  });

  it('should have a function handleCityChange prop', () => {
    const { handleCityChange } = Props;
    expect(handleCityChange).to.be.defiend
    expect(handleCityChange).to.be.an('Function');
  });

  it('should have a function handleAcceptTrade prop', () => {
    const { handleAcceptTrade } = Props;
    expect(handleAcceptTrade).to.be.defiend
    expect(handleAcceptTrade).to.be.an('Function');
  });

  it('should have a function handleDeclineTrade prop', () => {
    const { handleDeclineTrade } = Props;
    expect(handleDeclineTrade).to.be.defiend
    expect(handleDeclineTrade).to.be.an('Function');
  });

  it('should have a function handleBookSearchChange prop', () => {
    const { handleBookSearchChange } = Props;
    expect(handleBookSearchChange).to.be.defiend
    expect(handleBookSearchChange).to.be.an('Function');
  });

  it('should have a function handleRemoveBook prop', () => {
    const { handleRemoveBook } = Props;
    expect(handleRemoveBook).to.be.defiend
    expect(handleRemoveBook).to.be.an('Function');
  });

});
