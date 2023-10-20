import React, { useState, useEffect } from 'react';

const Loader4: React.FC = () => {
  const [text, setText] = useState('Z U R I P R O J R C E T  . . . . . . . . ');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length === 0) {
        clearInterval(interval);
      } else {
        setDisplayText((prevText) => prevText + text[0]);
        setText((prevText) => prevText.slice(1));
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{displayText}</p>
    </div>
  );
};

export default Loader4;
