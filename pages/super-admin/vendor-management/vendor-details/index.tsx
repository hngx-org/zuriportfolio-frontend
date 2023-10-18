import React from 'react';
import VendorDetails from '../../../view-components/super-admin/vendor-managment/details/VendorDetails';
import Nav from '../../../view-components/super-admin/navbar';
import { withAdminAuth } from '../../../../helpers/withAuth';

function details(): React.ReactElement {
  return (
    <main>
      <Nav />
      <VendorDetails />
    </main>
  );
}

export default withAdminAuth(details);
