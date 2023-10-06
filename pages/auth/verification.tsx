import React from 'react';
import VerificationLinkSent from '../../modules/auth/verificationLinkSent';
import VerificationLayout from '../../modules/auth/component/verificationLayout';
import VerificationComplete from '../../modules/auth/verificationComplete';
import ChangeEmailAddress from '../../modules/auth/changeEmailAddress';

function Verification() {
  return (
    <>
      {/* <VerificationLinkSent /> */}
      {/* <ChangeEmailAddress /> */}
      <VerificationComplete />
    </>
  );
}

export default Verification;
