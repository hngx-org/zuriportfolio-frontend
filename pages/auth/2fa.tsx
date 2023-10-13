'use client';
import Code2FA from '../../modules/auth/Code2FA';
import UI2FA from '../../modules/auth/UI2FA';
import React from 'react';
import AuthLayout from '@modules/auth/component/AuthLayout';
import withAuth from '../../helpers/withAuth';

function _2FA() {
  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <section className="grid font-manropeEB overflow-hidden overflow-y-hidden ">
        <UI2FA />
        <div className="flex items-center flex-col gap-11 py-24 lg:pt-3">
          <Code2FA />
        </div>
      </section>
    </AuthLayout>
  );
}
export default withAuth(_2FA);
