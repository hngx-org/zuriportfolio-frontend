import React from 'react';
import withAuth from '../helpers/withAuth';

function dashboard() {
  return <div>dashboard</div>;
}

export default withAuth(dashboard);
