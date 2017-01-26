import React, { Component } from 'react';
import NavBar from './containers/NavBarContainer/NavBar';
import Footer from './components/FooterComponent/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }

}


export default App;
