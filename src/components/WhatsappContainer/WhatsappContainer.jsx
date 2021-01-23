import React from 'react';
import './WhatsappContainer.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';

const WhatsappContainer = () => {
  return (
    <div className='container'>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default WhatsappContainer;
