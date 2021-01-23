import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
import { db } from '../../../../libs/firebase';
import firebase from 'firebase';

const SidebarChat = ({ newChat, id, name }) => {
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    const lastMessageCleanUp = db
      .collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setLastMessage(snapshot.docs.map(doc => doc.data()))
      );
    return () => {
      lastMessageCleanUp();
    };
  }, [id]);

  const addNewChat = () => {
    const roomName = prompt('Please enter a name for chat...');

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const goOnTop = () => {
    db.collection('rooms').doc(id).set({
      name: name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      {newChat ? (
        <div onClick={addNewChat} className='sidebarChat addNewChat'>
          <h2>Add new chat</h2>
        </div>
      ) : (
        <Link className='link' to={`/${id}`}>
          <div onClick={goOnTop} className='sidebarChat'>
            <Avatar
              src={`https://avatars.dicebear.com/4.5/api/male/${id}.svg`}
              alt={name}
            />
            <div className='room'>
              <h2>{name}</h2>
              <p>{lastMessage[0]?.message}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default SidebarChat;
