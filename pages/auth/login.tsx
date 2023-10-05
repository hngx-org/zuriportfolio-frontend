import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import withoutAuth from '../../helpers/withoutAuth';
import LoginForm from '../../components/Login/LoginForm';

function Login() {
  // return <MainLayout activePage="login"><LoginForm/></MainLayout>;
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default withoutAuth(Login);
