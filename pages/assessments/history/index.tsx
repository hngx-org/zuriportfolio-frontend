import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import Head from 'next/head';
import History from '@modules/assessment/component/History';
import withAuth from '../../../helpers/withAuth';

const Assessmenthistory = () => {
  return (
    <MainLayout showTopbar activePage="dashboard" showFooter showDashboardSidebar={false}>
      <div>
        <Head>
          <style>
            {`
        
        .overscroll::-webkit-scrollbar{
          width: 7px;
          height: 10px;
          background: #eee;
      }
      .overscroll::-webkit-scrollbar-thumb{
          background: #009254;
          border-radius: 5px;
      }
        `}
          </style>
        </Head>
        <History />
      </div>
    </MainLayout>
  );
};

export default withAuth(Assessmenthistory);
