import { Avatar, IconButton } from '@material-ui/core';
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import useStayScrolled from 'react-stay-scrolled';
import './Chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import Message from './Message/Message';
import { db } from '../../../libs/firebase';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../global/globalContext';

const Chat = () => {
  const listRef = useRef();
  const { stayScrolled /*, scrollBottom*/ } = useStayScrolled(listRef);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const params = useParams();
  const { userInfo } = useContext(UserContext);

  useLayoutEffect(() => {
    stayScrolled();
  }, [messages]);

  useEffect(() => {
    const roomName = db
      .collection('rooms')
      .doc(params.id)
      .onSnapshot(snapshot => setChats(snapshot.data()?.name));
    return () => {
      roomName();
    };
  }, [params.id]);

  useEffect(() => {
    const allMessages = db
      .collection('rooms')
      .doc(params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      allMessages();
    };
  }, [params.id]);

  const handleMessage = e => {
    setMessage(e.target.value);
  };
  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      db.collection('rooms').doc(params.id).collection('messages').add({
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: userInfo.name,
      });
    }
    setMessage('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/male/${params.id}.svg`}
        />
        <div className='chat__room'>
          <h2>{chats}</h2>
          <p>
            Last seen {''}
            {new Date(
              messages[messages.length - 1]?.data?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className='chat__buttons'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body' ref={listRef}>
        {messages.map(({ id, data }) => (
          <>
            {userInfo.name !== data.user ? (
              <Message
                login
                user={data.user}
                key={id}
                id={id}
                message={data.message}
                time={new Date(data.timestamp?.toDate()).toUTCString()}
              />
            ) : (
              <Message
                logIn
                user={data.user}
                key={id}
                id={id}
                message={data.message}
                time={new Date(data.timestamp?.toDate()).toUTCString()}
              />
            )}
          </>
        ))}
      </div>
      <div className='chat__input'>
        <div className='chat__btnLeft'>
          <IconButton>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
        </div>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleMessage}
            placeholder='Type a message'
          />
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
