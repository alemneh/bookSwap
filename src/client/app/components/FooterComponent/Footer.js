import React from 'react';

const Footer = () => {

    return (
      <footer style={{clear: 'both', marginTop: '120px'}} className="footer text-center">
        <div className="container">
          <a target="_blank" href="https://github.com/alemneh/bookSwap"><i className="fa fa-github"></i></a>
          <p className="text-muted">Powered by Google Books API.</p>
        </div>
      </footer>
    )

}

export default Footer;
