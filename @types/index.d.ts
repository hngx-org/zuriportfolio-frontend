// export all interfaces and type s
declare module 'nprogress';

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  activePage: string;
  showDashboardSidebar?: boolean;
  showTopbar?: boolean;
  showFooter?: boolean;
}

export interface MainLayoutContextProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}

export interface VerificationLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
}
export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  title?: string;
  size?: 'lg' | 'md' | 'sm';
  isCloseIconPresent?: boolean;
}

export interface PriceData {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

export interface SummaryProps {
  prices?: PriceData;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  authLeftImage?: React.ReactNode;
  isTopRightBlobShown?: boolean;
  isBottomLeftPadlockShown?: boolean;
}
export interface OrderHistory {
  id: number;
  productName: string;
  customerName: string;
  date: Date;
  status: string;
  type?: string;
  price?: number;
  sales?: number;
}
