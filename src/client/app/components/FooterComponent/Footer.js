import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer style={{clear: 'both', marginTop: '120px'}} className="footer text-center">
        <div className="container">
          <p className="text-muted">Powered by Google Books API.</p>
        </div>
      </footer>
    )
  }

}

export default Footer;
