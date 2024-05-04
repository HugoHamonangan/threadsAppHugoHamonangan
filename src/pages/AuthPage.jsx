import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Inputs from '../components/Inputs';
import Label from '../components/Label';
import { asyncSetAuthUser } from '../states/authUser/action';
import { asyncRegister } from '../states/register/action';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toggleForm, setToggleForm] = useState(false);

  const dispatch = useDispatch();

  const onLogin = async ({ emailLogin, passwordLogin }) => {
    await dispatch(
      asyncSetAuthUser({ email: emailLogin, password: passwordLogin })
    );

    window.location.href = '/';
  };

  function toggleToLogin() {
    setToggleForm(false);
  }

  function toggleToRegister() {
    setToggleForm(true);
  }

  const register = (e) => {
    e.preventDefault();
    dispatch(asyncRegister(name, email, password));
    toggleToLogin();
  };

  if (toggleForm === false) {
    if (accessToken === null) {
      return (
        <Login
          onLogin={onLogin}
          emailLogin={emailLogin}
          passwordLogin={passwordLogin}
          setEmailLogin={setEmailLogin}
          setPasswordLogin={setPasswordLogin}
          toggleToRegister={toggleToRegister}
        />
      );
    }
    return (
      <h1 className="font-bold text-2xl text-green-500 text-center pt-11">
        Anda Sudah Login
      </h1>
    );
  }

  return (
    <Register
      register={register}
      toggleToLogin={toggleToLogin}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default AuthPage;
