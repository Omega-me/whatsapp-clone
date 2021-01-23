import React from 'react';
import './Layout.css';
import Footer from '../Footer/Footer';
import WhatsappContainer from '../WhatsappContainer/WhatsappContainer';

const Layout = () => {
  return (
    <div className='layout'>
      <WhatsappContainer />
      <Footer />
    </div>
  );
};

export default Layout;
