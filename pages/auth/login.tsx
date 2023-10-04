import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import withoutAuth from '../../helpers/withoutAuth';

function Login() {
  return <MainLayout activePage="login">Login</MainLayout>;
}

export default withoutAuth(Login);
