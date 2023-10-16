export const authUser = async () => {
  const token = localStorage.getItem('zpt');
  const response = await fetch(`https://staging.zuri.team/api/auth/api/auth/verify/${token}`);
  const data = await response.json();
  return data;
};
