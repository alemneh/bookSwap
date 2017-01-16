import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


import UserBooks from '../src/client/app/components/UserBooksComponent/Userbooks'

let wrapper, Props;
const props = {
  search: '',
  userBooks: [],
  book2Remove: {},
  _queryBook2Add: () => {},
  handleRemoveBook: () => {},
  _removeBookFromUser: () => {},
  handleBookSearchChange: () => {}
}

describe('<UserBooks />', () => {
  beforeEach(() => {
    wrapper = shallow(<userBooks {...props}/>);

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

  it('should have a function _queryBook2Add prop', () => {
    const { _queryBook2Add } = Props;
    expect(_queryBook2Add).to.be.defiend
    expect(_queryBook2Add).to.be.an('Function');
  });

  it('should have a function handleRemoveBook prop', () => {
    const { handleRemoveBook } = Props;
    expect(handleRemoveBook).to.be.defiend
    expect(handleRemoveBook).to.be.an('Function');
  });

  it('should have a function _removeBookFromUser prop', () => {
    const { _removeBookFromUser } = Props;
    expect(_removeBookFromUser).to.be.defiend
    expect(_removeBookFromUser).to.be.an('Function');
  });

  it('should have a function handleBookSearchChange prop', () => {
    const { handleBookSearchChange } = Props;
    expect(handleBookSearchChange).to.be.defiend
    expect(handleBookSearchChange).to.be.an('Function');
  });

});
