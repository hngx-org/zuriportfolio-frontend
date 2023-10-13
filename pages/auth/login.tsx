import React from 'react';
// import withoutAuth from '../../helpers/withoutAuth';
import LoginForm from '../../modules/auth/component/Login/LoginForm';
import withoutAuth from '../../helpers/withoutAuth';

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default withoutAuth(Login);
