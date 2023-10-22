import React, { useContext, useEffect } from 'react';

import { twMerge } from 'tailwind-merge';

import { MainLayoutProps } from '../../@types';
import MainLayoutContext from '../../context/LayoutContext';
import Footer from '../Footer';
import SideBar from '../Navbars/Sidebar';
import TopBar from '../Navbars/TopBar';
import useAuthRevalidate from '../../hooks/Auth/useAuthRevalidate';

function MainLayout({
  children,
  activePage,
  className,
  showDashboardSidebar = true,
  showFooter = true,
  showTopbar,
  includeMarginTop = true,
}: MainLayoutProps) {
  const { setActivePage } = useContext(MainLayoutContext);

  useAuthRevalidate();

  useEffect(() => {
    setActivePage(activePage as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={twMerge('w-full relative h-screen overflow-y-auto overflow-x-hidden', className)}>
      {showTopbar && <TopBar activePage={activePage} showDashBorad={showDashboardSidebar} />}

      {showDashboardSidebar && <SideBar activePage={activePage} />}
      <div className={`w-full ${includeMarginTop ? 'mt-5' : ''}`}>{children}</div>

      {showFooter && <Footer />}
    </div>
  );
}

export default MainLayout;
