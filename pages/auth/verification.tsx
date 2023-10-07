import React, { useState } from 'react';
import VerificationLinkSent from '../../modules/auth/verificationLinkSent';
import ChangeEmailAddress from '../../modules/auth/changeEmailAddress';

function Verification() {
  const [showChangePasswordPage, setShowChangePasswordPage] = useState<boolean>(false);

  const handleClick = () => {
    setShowChangePasswordPage((prev) => !prev);
  };

  return <>{!showChangePasswordPage ? <VerificationLinkSent handleClick={handleClick} /> : <ChangeEmailAddress />}</>;
}

export default Verification;
