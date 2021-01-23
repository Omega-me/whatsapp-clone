import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        &copy; {''}
        {new Date().getFullYear()}
        {''} Omega-me
      </p>
    </div>
  );
};

export default Footer;
