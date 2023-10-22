import React from 'react';

function logAllLocalStorageItems() {
  for (const key in localStorage) {
    const value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
  }
}

const LocalStorageLogger = () => {
  return (
    <div>
      <button onClick={logAllLocalStorageItems}>Log Local Storage Items</button>
    </div>
  );
};

export default LocalStorageLogger;
