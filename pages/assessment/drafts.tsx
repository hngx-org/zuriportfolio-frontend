import React from 'react';
import DraftPage from '../../modules/assessment/draftPage';
import Header from '@modules/assessment/component/Header';

const Draft = () => {
  return (
    <div>
      <Header heading={'Draft'} body={'All incomplete assessments, saved, to be worked on later.'} />
      <DraftPage />
    </div>
  );
};

export default Draft;
