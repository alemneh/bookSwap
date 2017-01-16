import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


import Trade from '../src/client/app/components/TradeComponent/Trade'

let wrapper, Props;
const props = {
  pendingTrades: [],
  viewTrade: () => {},
  tradeRequests: [],
  user: {},
  trade: {},
  handleAcceptTrade: () => {},
  handleDeclineTrade: () => {}
}

describe('<Trade />', () => {
  beforeEach(() => {
    wrapper = shallow(<Trade {...props}/>);

    Props = wrapper.unrendered.props;
  });

  it('should render', () => {
    expect(wrapper).to.exist
  });

  it('should have an array of pendingTrades prop', () => {
    const { pendingTrades } = Props;
    expect(pendingTrades).to.be.defiend
    expect(pendingTrades).to.be.an('Array');
  });

  it('should have an array of pendingTrades prop', () => {
    const { pendingTrades } = Props;
    expect(pendingTrades).to.be.defiend
    expect(pendingTrades).to.be.an('Array');
  });

  it('should have a function viewTrade prop', () => {
    const { viewTrade } = Props;
    expect(viewTrade).to.be.defiend
    expect(viewTrade).to.be.an('Function');
  });


  it('should have an object user prop', () => {
    const { user } = Props;
    expect(user).to.be.defiend
    expect(user).to.be.an('Object');
  });

  it('should have an object trade prop', () => {
    const { trade } = Props;
    expect(trade).to.be.defiend
    expect(trade).to.be.an('Object');
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

});
