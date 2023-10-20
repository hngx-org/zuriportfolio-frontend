import React, { FC } from 'react';

interface Props {
  message?: string;
}

function NoEndpoint({ message }: Props) {
  return (
    <div className="py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
      {message || 'No Product To Show'}
    </div>
  );
}

export default NoEndpoint;
