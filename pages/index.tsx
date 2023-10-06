import Link from 'next/link';
import React, { useState } from 'react'; // Import React and useState
import MainLayout from '../components/Layout/MainLayout';
import CategoriesNav from '../modules/marketplace/component/CategoriesNav/CategoriesNav';
import ProductDetailsDescription from '../modules/marketplace/productDetailsDescription';
import RemoveCart from '../components/Modals/Removecart'; // Import the RemoveCart component

function Home() {
  const navItems: string[] = [
    'All Categories',
    ' Design & Graphics',
    ' Development & Programming',
    ' Content Creation',
    ' Digital Arts & Media',
    ' Audio & Sound',
    ' Photography',
    ' More...',
  ];

  // State to control the visibility of the RemoveCart modal
  const [isRemoveCartModalOpen, setIsRemoveCartModalOpen] = useState(false);

  // Function to open the RemoveCart modal
  const openRemoveCartModal = () => {
    setIsRemoveCartModalOpen(true);
  };

  // Function to close the RemoveCart modal
  const closeRemoveCartModal = () => {
    setIsRemoveCartModalOpen(false);
  };

  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <CategoriesNav navItems={navItems} />

      {/* Your existing content */}

      <h1>Welcome to the Home Page</h1>
      <button onClick={openRemoveCartModal}>Remove Cart</button>
      {/* Render the RemoveCart modal conditionally based on state */}
      {isRemoveCartModalOpen && <RemoveCart onClose={closeRemoveCartModal} />}
    </MainLayout>
  );
}

export default Home;
