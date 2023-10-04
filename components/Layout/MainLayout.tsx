import React, { useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import SideBar from '../Navbars/Sidebar';
import MainLayoutContext from '../../context/LayoutContext';
import TopBar from '../Navbars/TopBar';
import { MainLayoutProps } from '../../@types';

function MainLayout({
  children,
  activePage,
  className,
  showDashboardSidebar = true,
  showFooter,
  showTopbar,
}: MainLayoutProps) {
  const { setActivePage } = useContext(MainLayoutContext);

  useEffect(() => {
    setActivePage(activePage as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={twMerge('w-full relative h-screen overflow-y-auto', className)}>
      {showTopbar && <TopBar />}

      <div className="flex">
        {showDashboardSidebar && <SideBar activePage={activePage} />}
        {children}
      </div>
      {showFooter && <TopBar />}
    </div>
  );
}

export default MainLayout;
