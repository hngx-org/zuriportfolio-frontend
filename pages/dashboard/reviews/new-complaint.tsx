import React from 'react';
import ReviewForms from '@modules/dashboard/component/reviews/ReviewForm';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';

export default function ComplaintForm() {
  return (
    <div className=" h-[100vh]">
      <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
        <Container>
          <div className="w-full flex-col mt-6">
            <p className="w-[100%] m-0 mb-10 text-4xl font-bold text-brand-green-primary">Complaint Form</p>
            <div className=" flex items-center justify-center">
              <div className="flex flex-col w-[100%] items-center justify-center">
                <ReviewForms />
              </div>
            </div>
          </div>
        </Container>
      </MainLayout>
    </div>
  );
}
