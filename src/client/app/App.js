import React, { Component } from 'react';
import NavBar from './components/NavComponent/NavBar';
import Footer from './components/FooterComponent/Footer';


class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
