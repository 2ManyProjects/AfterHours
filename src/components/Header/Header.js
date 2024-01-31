'use client'

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MenuButton from './MenuButton/MenuButton.js';
import LoginModal from '../Modal/LoginModal/LoginModal.js';
import ChangePasswordModal from '../Modal/ChangePasswordModal/ChangePasswordModal.js';
import SignUpModal from '../Modal/SignupModal/SignupModal.js';
import { useDispatch, useSelector } from 'react-redux';
import {login as StateLogin, logout as StateLogout} from '../../state/authSlice.js';
import { changePassword, forgotPassword, login, signUp, getCognitoUser} from '../../state/CognitoHelper.js';

const Header = () => {
  const dispatch = useDispatch();
  
  const [showLogin, setShowLogin] = useState(false); 
  const [showSignup, setShowSignup] = useState(false); 
  const [showChangePassword, setShowChangePassword] = useState(false); 
  const {isLoggedIn, user, session} = useSelector(state => state.auth)
  
  const handleLogin = () => {
    console.log('Login action');
    setShowLogin(true);
  };

  const handleSignUp = () => {
    console.log('Sign Up action');
    setShowSignup(true);
  };

  const handleLogout = () => {
    console.log('Logout action');
    // Implement logout logic here
    dispatch(StateLogout())
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <MenuButton />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} login={async(email, password) => {
          let loginResult = await login(email, password)
          if(loginResult){
            dispatch(StateLogin({...loginResult?.data, email}));
            setShowLogin(false)
          }
          console.log(loginResult);
        }}
        forgotPassword={async(email) => {
          let forgotPasswordResult = await forgotPassword(email)
          console.log(forgotPasswordResult);
        }}/>
      <SignUpModal open={showSignup} onClose={() => setShowSignup(false)} signUp={async(email, password) => {
        let signUpResult = await signUp(email, password)
        console.log(signUpResult);
      }}/>
      <ChangePasswordModal open={showChangePassword} onClose={() => setShowChangePassword(false)}
        changePassword={async(oldpassword, newpassword) => {
          let changePasswordResult = await changePassword(session, user, oldpassword, newpassword)
          console.log(changePasswordResult);
        }}/>

      <nav>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
            {/* <Button color="inherit" disabled onClick={handleSignUp}>Sign Up</Button> */}
          </>
        ) : (
          <>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
            {/* <Button color="inherit" disabled onClick={() => setShowChangePassword(true)}>ChangePassword</Button> */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
