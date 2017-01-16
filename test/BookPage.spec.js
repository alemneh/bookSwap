import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


import BookPage from '../src/client/app/components/BookPageComponent/BookPage'

let wrapper, Props;
const props = {
  userBooks: [],
  allBooks: [],
  setRequesteeBook: () => {},
  cancelRequesterBook: () => {},
  handleTradeRequest: () => {},
  requesteeBook: {},
  onBookSelect: () => {},
  requesterBook: {}
}

describe('<BookPage />', () => {
  beforeEach(() => {
    wrapper = shallow(<BookPage {...props}/>);

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

  it('should have an array of allBooks prop', () => {
    const { allBooks } = Props;
    expect(allBooks).to.be.defiend
    expect(allBooks).to.be.an('Array');
  });

  it('should have a function setRequesteeBook prop', () => {
    const { setRequesteeBook } = Props;
    expect(setRequesteeBook).to.be.defiend
    expect(setRequesteeBook).to.be.an('Function');
  });

  it('should have a function cancelRequesterBook prop', () => {
    const { cancelRequesterBook } = Props;
    expect(cancelRequesterBook).to.be.defiend
    expect(cancelRequesterBook).to.be.an('Function');
  });

  it('should have a function handleTradeRequest prop', () => {
    const { handleTradeRequest } = Props;
    expect(handleTradeRequest).to.be.defiend
    expect(handleTradeRequest).to.be.an('Function');
  });

  it('should have an object requesteeBook prop', () => {
    const { requesteeBook } = Props;
    expect(requesteeBook).to.be.defiend
    expect(requesteeBook).to.be.an('Object');
  });

  it('should have an object requesterBook prop', () => {
    const { requesterBook } = Props;
    expect(requesterBook).to.be.defiend
    expect(requesterBook).to.be.an('Object');
  });

  it('should have a function onBookSelect prop', () => {
    const { onBookSelect } = Props;
    expect(onBookSelect).to.be.defiend
    expect(onBookSelect).to.be.an('Function');
  });

});
