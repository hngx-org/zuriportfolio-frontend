import React, { useState, useEffect } from 'react';
import Loader2 from '../../components/Loader/loader2';
import Loader1 from '../../components/Loader/Loader1';
import Loader3 from '../../components/Loader/Loader3';
import Loader4 from '../../components/Loader/Loader4';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  // return <div className="App">{isLoading ? <Loader1 /> : <p>Your content here</p>}</div>;
  return <div className="App">{isLoading ? <Loader2 /> : <p>Your content here</p>}</div>;
  // return <div className="App">{isLoading ? <Loader3/> : <p>Your content here</p>}</div>;
  //return <div className="App">{isLoading ? <Loader4/> : <p>Your content here</p>}</div>;
};

export default App;
