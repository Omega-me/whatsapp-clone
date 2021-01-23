import React, { useContext } from 'react';
import './Login.css';
import Logo from '../../images/logo.png';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../libs/firebase';
import { UserContext } from '../../global/globalContext';

const Login = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(results => setUserInfo(results.additionalUserInfo.profile))
      .catch(error => alert(error.message));
  };
  console.log(userInfo);

  return (
    <div className='login'>
      <img src={Logo} alt='logo' />
      <Button onClick={signIn}>Login with google</Button>
    </div>
  );
};

export default Login;
