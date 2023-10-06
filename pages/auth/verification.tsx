import React from 'react';
import VerificationLinkSent from '../../modules/auth/verificationLinkSent';
import VerificationLayout from '../../modules/auth/component/verificationLayout';

function Verification() {
  return (
    <VerificationLayout>
      <VerificationLinkSent />
    </VerificationLayout>
  );
}

export default Verification;
