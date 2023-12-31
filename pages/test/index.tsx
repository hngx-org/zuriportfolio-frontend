import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/loader2';
import ComplaintModal from '../../components/Modals/ComplaintModal';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
  }, []);

  return <div className="App">{isLoading ? <Loader /> : <p>Your content here</p>}</div>;
};

export default App;

{
  /*
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Complaint Modal</button>

      <ComplaintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product="your-product-id"
        customerID="your-customer-id"
      />
    </div>
  );
};

export default App;
*/
}

// For API fetch Call response

{
  /*

import React, { useState, useEffect } from 'react';
import Loader2 from '../../components/Loader/loader2';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an API request here
    fetch('your_api_endpoint_here')
      .then(response => response.json())
      .then(data => {
        // Once the API call is successful, set isLoading to false
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API request error:', error);
      });
  }, []);

  return <div className="App">{isLoading ? <Loader2 /> : <p>Your content here</p>}</div>;
};

export default App;
*/
}
