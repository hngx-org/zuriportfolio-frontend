// ParentComponent.tsx
import React, { useState } from 'react';
import RemoveCart from './Removecart';

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = () => {
    // Your logic to remove the item from the cart
  };

  return (
    <div>
      {/* Your parent component JSX here */}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      {isModalOpen && <RemoveCart closeModal={closeModal} onRemoveItem={handleRemoveItem} />}
    </div>
  );
};

export default ParentComponent;
