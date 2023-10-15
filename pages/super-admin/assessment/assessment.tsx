import React from 'react';
import Preview from '../../../modules/assessment/component/AssessmentPreview';
import MainLayout from '../../../components/Layout/MainLayout';

export default function PreviewCreatedResponse() {
  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <Preview />
    </MainLayout>
  );
}
