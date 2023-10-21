import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import Head from 'next/head';
import History from '@modules/assessment/component/History';
import { withUserAuth } from '../../../helpers/withAuth';
import assessment from '../../super-admin/assessment';

const Assessmenthistory = () => {
  return (
    <MainLayout showTopbar activePage="dashboard" showFooter showDashboardSidebar={false}>
      <div>
        <Head>
          <style>
            <title>Assessment history</title>
            <meta name="description" content={`User assessment history page`} />
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

export default withUserAuth(Assessmenthistory);
