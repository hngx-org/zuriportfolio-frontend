import React from 'react';
import Preview from '../../../modules/assessment/component/AssessmentPreview';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import { withAdminAuth } from '../../../helpers/withAuth';

function PreviewCreatedResponse() {
  return (
    <>
      <SuperAdminNavbar />
      <Preview />
    </>
  );
}

export default withAdminAuth(PreviewCreatedResponse);
