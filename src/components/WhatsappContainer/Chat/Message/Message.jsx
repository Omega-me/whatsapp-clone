import React from 'react';
import './Message.css';

const Message = ({ logIn, message, user, time }) => {
  return (
    <>
      {logIn ? (
        <div className='myMessage'>
          <div className='message__myMsg'>
            <h5 className='message__myDate'>{time}</h5>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div className='message'>
          <h5 className='message__name'>{user}</h5>
          <div className='message__msg'>
            <p>{message}</p>
            <h5 className='message__date'>{time}</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
