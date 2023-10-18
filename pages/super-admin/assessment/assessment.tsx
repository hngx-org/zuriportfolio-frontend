import React from 'react';
import Preview from '../../../modules/assessment/component/AssessmentPreview';
import MainLayout from '../../../components/Layout/MainLayout';
import { withAdminAuth } from '../../../helpers/withAuth';

function PreviewCreatedResponse() {
  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <Preview />
    </MainLayout>
  );
}

export default withAdminAuth(PreviewCreatedResponse)
