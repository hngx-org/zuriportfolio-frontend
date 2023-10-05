import React from 'react';
import withAuth from '../helpers/withAuth';
import Button from '@ui/Button';

function dashboard() {
  return (
    <div>
      <Button intent={'error'} isLoading={true}>
        welcome
      </Button>
    </div>
  );
}

export default withAuth(dashboard);
