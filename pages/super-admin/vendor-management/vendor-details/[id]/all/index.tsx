import React from 'react';
import VendorDetails from '../../../../../view-components/super-admin/vendor-managment/details/VendorDetails';
import Nav from '../../../../../view-components/super-admin/navbar';
import { withAdminAuth } from '../../../../../../helpers/withAuth';
import SuperAdminVendorProductHeader from '@modules/super-admin/components/vendormanagement/VendorProductHeader';

function details(): React.ReactElement {
  return (
    <>
      <SuperAdminVendorProductHeader />
      <Nav />
      <VendorDetails />
    </>
  );
}

export default withAdminAuth(details);
