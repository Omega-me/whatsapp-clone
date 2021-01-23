import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core/styles';
import SidebarChat from './SidebarChat/SidebarChat';
import { db } from '../../../libs/firebase';
import { UserContext } from '../../../global/globalContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  icon: {
    fontSize: '24px',
  },
  searchIcon: {
    color: 'grey',
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const allRooms = db
      .collection('rooms')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setRooms(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      allRooms();
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar
          onClick={() => history.push('/')}
          src={userInfo.picture}
          alt={userInfo.name}
        />
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <ChatIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <MoreVertIcon className={classes.icon} />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlinedIcon className={classes.searchIcon} />
          <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat newChat />
        {rooms.map(({ id, data }) => (
          <SidebarChat key={id} id={id} name={data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
