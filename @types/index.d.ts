import React from 'react';
import SuperAdminNavbar from '../modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '../modules/super-admin/components/pagination';

// export all interfaces and types
declare module 'nprogress';

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  activePage: string;
  showDashboardSidebar?: boolean;
  showTopbar?: boolean;
  showFooter?: boolean;
}
export interface Education {
  id: number;
  degree: string;
  fieldOfStudy: string;
  school: string;
  description: string;
  dateFrom: string;
  dateTo: string;
}
export interface AllCategoryDetails {
  price: string;
  name: string;
  author: string;
  imageUrl: string;
  showTopPicks: boolean;
  showDiscount: boolean;
  showLimitedOffer: boolean;
  discount: number;
}
export interface Products {
  id: number;
  name: string;
  image: string;
  shopOwner: string;
  price: number;
  category: string;
}

export interface SuperAdminPagination {
  title: any;
}

export interface PaginationBtn {
  handleClick?: any;
  disabledFn?: any;
  title: any;
}

export interface MainLayoutContextProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}

export interface CartProductCardProps {
  id: string;
  productImage: string;
  productTitle: string;
  // cardStyle: string;
  productPrice: number;
  productRating: number;
  productSeller: string;
  discountPercentage?: number;
  tag?: string;
  tagBackground?: string;
}

export interface ProductCardProps {
  id: string;
  currency: string;
  image: string | null;
  productName: string;
  productPrice: number;
  productOwner: string;
  productRating: number;
  showLimitedOffer?: boolean;
  showTopPicks?: boolean;
  showDiscount?: boolean;
  discount?: number;
}

export interface ratingProps {
  src: string;
  alt: string;
}

export interface starProps {
  [key: number]: ratingProps;
}

export interface VerificationLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  handleClick?: any;
}

export interface ProductCardProps {
  image: string;
  productName: string;
  productPrice: string;
  productOwner: string;
  productRating: number;
  showLimitedOffer?: boolean;
  showTopPicks?: boolean;
  showDiscount?: boolean;
  discount?: number;
}

export interface ratingProps {
  src: string;
  alt: string;
}

export interface starProps {
  [key: number]: ratingProps;
}

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  title?: string;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xxl';
  isCloseIconPresent?: boolean;
  closeBtnClass?: string;
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

// Password interface
export interface PasswordPopoverProps {
  password: string;
  children: React.ReactNode;
}

export interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

export interface ProgressBarProps {
  color: string;
  value: number;
}

// Toastify interface

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
export type ToastTheme = 'light' | 'dark' | 'colored';
export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'default';
export interface ToastProps {
  message?: string;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: ToastTheme;
  type?: ToastVariant;
}

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

export type ProductCardProps = {
  productTitle: string;
  productPrice: number;
  productSeller: string;
  productImage: string;
  productRating: number;
  cardStyle: string;
  discountPercentage?: number;
  tag?: string;
  tagBackground?: string;
};

export type CartItemProps = {
  productId: string;
  productImage: string;
  productTitle: string;
  proudctDescription?: string;
  productSize?: string;
  productColor?: string;
  productSeller: string;
  productPrice: number;
};

export type ViewedProductCardProps = {
  id: string;
  productImage: string;
  productPrice: number;
  discountPercentage?: number;
  productRating: number;
  productSeller: string;
  productTitle: string;
  tag?: string;
  tagBackground?: string;
};

// In a file like '@types/index.ts' or a similar location

export interface ActivityCardProps {
  name: string;
  item: string;
}

export interface MetricCardProps {
  title: string;
  percentage: number;
  isCurrency: boolean;
  value: number;
}

export interface MetricChartProps {
  title: string;
  src: string;
  isBarChart: boolean;
}

export interface MetricMonthsProps {
  month: string;
}

export interface MetricTimelineProps {
  timespan: string;
  index: number;
  active: boolean;
  setTimeline: (data: { active: boolean; index: number }) => void;
}

export interface OrderHistory {
  id: number;
  productName: string;
  customerName: string;
  date: Date;
  status: 'completed' | 'cancelled' | 'pending';
  productType: string;
  price: number;
  sales: number;
  revenue: number;
}

export interface WishlistProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: StaticImageData;
  productRating: number;
  numReviews: number;
  productCategory: string;
  inStock: boolean;
  inCart: boolean;
}
export interface WorkExperience {
  role: string;
  description: string;
  company: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  id: number;
}
export interface VerificationProps {
  handleClick(): void;
}
export interface PaginationBtn {
  handleClick: () => void;
  disabledFn: boolean;
  title: React.ReactNode;
}
export interface AdminTablePagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface PromotionHistory {
  productName: string;
  type?: string;
  status: string;
  discount?: number | string;
  quantity?: number;
  sales?: number;
  quantity?: number;
  action?: any;
}

export interface ReviewCardProps {
  id?: number;
  className?: string;
  imageSrc: string;
  title: string;
  author: string;
  avgRating: number;
  ratingNo: number;
  price: number;
}

export interface VendorCardProps {
  vendorname: string;
  pic: StaticImageData;
  name: string;
  price: number;
}

export interface VendorProduct {
  productName: string;
  productPrice: number;
  productAuthor: string;
  productImage: StaticImageData;
  id: number;
}

export interface PageProps {
  cards: Product[];
  record: number;
}

export interface ProjectModalProps {
  title: string;
  tags: string[];
  description: string;
  url: string;
  images: object[];
}

export interface ProjectModalProps {
  title: string;
  tags: string[];
  description: string;
  url: string;
  images: object[];
}

export interface RatingBarProps {
  avgRating: number;
}

export interface RatingCardProps {
  rating: number;
  users: number;
}

export interface filterProps {
  rating: number;
  review: number;
}

export interface reviewProps {
  buyerName: string;
  adminDate: string;
  review: string;
  noOfStars: number;
  shopName?: string;
  shopReply?: string;
  help?: number;
}

export interface searchProp {
  handleSearchChange: (searchString: string) => void;
}

export interface filterProp {
  handleFilter: (status: string) => void;
}

export type SectionModalProps = {
  openButtonText: string;
  heading: string;
  paragraph: string;
  primaryText: string;
  onClickAction: () => void;
};

export interface PaymentStatusModalProps {
  children: React.ReactNode;
}

export interface Vendor {
  vendorImgSrc: string;
  name: string;
  email: string;
  amount: string;
  quantity: number;
  date: string;
  statusIndicatorSrc: string;
  statusText: string;
}

export type BannedDeletedVendorsProps = {
  showBanned: boolean;
  setShowBanned: (any: boolean) => void;
  showDeleted: boolean;
  setShowDeleted: (any: boolean) => void;
};

export interface SettingOptionTypes {
  accountManagement: boolean;
  notificationSettings: boolean;
  deleteAccount: boolean;
  refer: boolean;
}
export interface NotificationCheckboxType {
  receiveEmail: boolean;
  specialOffers: boolean;
  getNotification: boolean;
  notifyFollow: boolean;
  notifyMessages: boolean;
}

export type cardinfo = {
  title: string;
  kMenu: string;
  price: number;
  arUp: string;
  id: number;
};
export type Graph = {
  id: number;
  title: string;
  btn: string;
  calender: {
    twelveM: string;
    threeM: string;
    thirtyD: string;
    sevenD: string;
    twentyFourH: string;
    md: boolean;
  };
};

export type topListingProduct = {
  id: number;
  productName: string;
  productImage: string;
  category: string;
  order: string;
  price: string;
  topSales: string;
  vendor: string;
};

export type activity = {
  name: string;
  purchased: string;
  pItem: string;
  id: number;
};
type cardinfo = {
  title: string;
  kMenu: string;
  price: number;
  arUp: string;
  id: number;
};

export type inputErrorMessage = {
  errorMessage: string;
  inputName: string;
  isValid: boolean;
};
// product listing types
export interface ProductInfo {
  productName: string;
  vendor: string;
  id: number;
  dateAdded: string;
  status: string;
}
export interface DeletedProducts {
  name: string;
  vendor: string;
  id: number;
  dateAdded: Date;
  dateDeleted: Date;
  status: string;
}
export interface CardData {
  id: number;
  bgImage: string;
  photoImage: string;
  name: string;
  role: string;
  skills: string[];
  totalProjects: number;
  badge: string;
  location: string;
}

export interface AuthContextProps {
  user: LoginBodyResponse | undefined;
  handleUser: (value: LoginBodyResponse) => void;
}

export type LoginBodyResponse = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  section_order: unknown;
  password: string;
  provider: unknown;
  profile_pic: unknown;
  refresh_token: string;
  role_id: number;
  is_verified: boolean;
  two_factor_auth: boolean;
  location: unknown;
  country: unknown;
  created_at: string;
};
export type LoginResponse = {
  token: string;
  data: LoginBodyResponse;
  statusCode: number;
};

export interface Review {
  id: number;
  rating: number;
  name: string;
  description: string;
}
