const getZptValueFromLocalStorage = (): string | null => {
  try {
    const zptValue = localStorage.getItem('zpt');
    if (zptValue) {
      return zptValue;
    }
  } catch (error) {
    console.error('Error retrieving "zpt" value from local storage:', error);
  }
  return null;
};

export default getZptValueFromLocalStorage;
