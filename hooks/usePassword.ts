import { ChangeEvent, useState } from "react";

const usePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const arePasswordSame = () => {
    return password === confirmPassword ? true : false;
  }

  return {
    password,
    confirmPassword,
    handleConfirmPasswordChange,
    handlePasswordChange,
    arePasswordSame
  }
}

export default usePassword;