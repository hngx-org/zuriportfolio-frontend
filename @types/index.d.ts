import React from 'react';
import SuperAdminNavbar from '../modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '../modules/super-admin/components/pagination';
import { boolean } from 'zod';

// export all interfaces and types
declare module 'nprogress';

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  activePage: string;
  showDashboardSidebar?: boolean;
  showTopbar?: boolean;
  showFooter?: boolean;
  includeMarginTop?: boolean;
}

export interface ProductData {
  [x: string]: SetStateAction<ProductData | null>;
  id: string;
  name: string;
  discount_price: string;
  description: string;
  price: string;
  images: any[];
  url: string[];
  rating: number;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    section: string;
    password: string;
    provider: string;
    phone_number: string;
    is_verified: boolean;
    two_factor_auth: boolean;
    location: string;
    country: string;
    profile_pic: string;
    profile_cover_photo: string;
    refresh_token: string;
    createdat: string;
    role: number;
  };
  quantity: Number;
  shop: string;
}

export interface RecentlyViewedData {
  user: string;
  product: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    category: number;
    price: number;
    discount_price: number;
    tax: string;
    admin_status: string;
    is_deleted: string;
    rating: number;
    is_published: false;
    showTopPicks: true;
    currency: string;
    createdat: string;
    updatedat: string;
    user: string;
    image_url: string;
    shop: {
      merchant: string;
      name: string;
      reviewed: string;
      rating: number;
    };
  };
  interaction_type: string;
  createdat: number;
}
export interface Award {
  id: number;
  sectionId: number;
  year: string;
  title: string;
  presented_by: string;
  url: string;
  description: string;
}

export interface AwardItemProps {
  award: Award;
}
export interface AwardListProps {
  // awards: Award[];
  isModalOpen: boolean;
}
export interface Certification {
  id: string;
  sectionId: number;
  year: string;
  title: string;
  organization: string;
  url: string;
  description: string;
}

export interface CertificationItemProps {
  certification: Certification;
}
export interface CertificationListProps {
  isModalOpen: boolean;
}

export interface Education {
  id: number;
  degree: string;
  fieldOfStudy: string;
  school: string;
  description: string;
  from: string;
  to: string;
}
export interface DegreeOption {
  id: number;
  type: string;
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
interface ImageData {
  id: string;
  product_id: string;
  url: string;
}
interface CategoryData {
  name: string;
}
interface Produne {
  name: string;
  // Add other properties specific to a product
}
export interface Products {
  id: string;
  name: string;
  product: Produne;
  image: ImageData[];
  shopOwner: string;
  price: number;
  category: CategoryData;
  description: string;
  specification: string;
  rating: number;
  currency: string;
  discount_price: string;
}

export interface Data {
  id: string;
  merchant_id: string;
  name: string;
  policy_confirmation: string | null;
  restricted: string;
  admin_status: string;
  is_deleted: string;
  reviewed: string | null;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
  products: Product;
}
export interface ShopData {
  products: Product;
  data?: Data;
}

export interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
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

export interface MarketPlaceProductCardProps {
  id: string;
  currency: string;
  image: string | null;
  name: string;
  price: number;
  user: string;
  rating: number;
  showLimitedOffer?: boolean;
  showTopPicks?: boolean;
  showDiscount?: boolean;
  discount_price?: number;
  shop?: {
    id: string;
    name: string;
  };
}

export interface IntrestedProducts {
  id: string;
  name: string;
  price: number;
  description: string;
  images: { url: string }[];
  category: { name: string };
  shop?: {
    id: string;
    name: string;
  };
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

//export type CartSumaryProp = { subtotal: number; discount: number; VAT: number; total: number };

export type CartSumaryProp = {
  subtotal: number;
  discount: number;
  VAT: number;
  total: number;
};

export type RecentlyViewedProductProp = {
  user: string;
  product: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    category: number;
    price: string;
    discount_price: string;
    tax: string;
    admin_status: string;
    is_deleted: string;
    rating: number;
    is_published: false;
    currency: string;
    createdat: string;
    updatedat: string;
    user: string;
    image_url: string;
    shop: {
      merchant: string;
      name: string;
      reviewed: string;
      rating: number;
    };
  };
  interaction_type: string;
  createdat: number;
};

export type CartItemProps = {
  id?: string;
  productId: string;
  productImage: string;
  productTitle: string;
  productDescription: string;
  productSize?: string;
  productColor?: string;
  productSeller: string;
  productPrice: number;
  productDiscount?: string;
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
  isPage: boolean;
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
  isEmployee: boolean;
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
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
  verUser: number;
}

export interface RatingCardProps {
  rating: number;
  users: number;
  totalReviews: number;
}

export interface filterProps {
  rating: number;
  review: number;
  filterReview(view: string, stars: string);
}

export interface reviewProps {
  reviewId: string;
  buyerName: string;
  adminDate: string;
  mainDate: string;
  review: string;
  noOfStars: number;
  shopName?: string;
  shopReply?: string;
  help?: number;
}

export interface revNavProps {
  shopNav?: boolean;
  marketPlaceNav?: boolean;
}

export interface searchProp {
  handleSearchChange: (searchString: string) => void;
}

export interface filterProp {
  handleFilter: (status: string) => void;
}

export type SectionModalProps = {
  openButtonText?: string;
  heading?: string;
  paragraph?: string;
  primaryText?: string;
  onClickAction?: () => void;
  sectionToDelete?: string;
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
  data: any;
  isLoading: Boolean;
};

export interface SettingOptionTypes {
  accountManagement: boolean;
  notificationSettings: boolean;
  deleteAccount: boolean;
  refer: boolean;
}
export interface NotificationCheckboxType {
  emailSummary: boolean;
  specialOffers: boolean;
  communityUpdate: boolean;
  followUpdate: boolean;
  newMessages: boolean;
  // userId:string
}

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
  map(arg0: (item: any, id: any) => React.JSX.Element): React.ReactNode;
  product_id?: number;
  product_name?: string;
  productImage?: string;
  category_name?: string;
  total_orders?: string;
  price?: string;
  top_sales?: string;
  vendor_name?: string;
  total_sales?: string;
};

type activity = {
  name: string;
  user_details: {
    first_name: string;
    last_name: string;
  };
  action: string;
  title: string;
  purchased: string;
  pItem: string;
  id: number;
};
export type cardinfo = {
  title: string;
  amount: any;
  ratio: number;
};

export type inputErrorMessage = {
  errorMessage: string;
  inputName: string;
  isValid: boolean;
};
// product listing types
export interface ProductInfo {
  product_name: string;
  vendor_name: string;
  product_id: number;
  date_added: string;
  status: string;
}

interface ProductStatistics {
  total_deleted_products: number;
  total_products: number;
  total_sanctioned_products: number;
}

export interface DeletedProducts {
  // admin_status: string;
  // category_id: number;
  // createdAt: string;
  // product_id : string;
  product_name: string;
  product_status: string;
  updatedAt: string;
  vendor_name: string;
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

export interface Review {
  rateNo: number;
  customerName: string;
  description: string;
}
export interface UserInfo {
  address: string;
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  location: string;
  profilePictureUrl: any;
  profileUrl: string;
  projects: number;
  provider: string;
  ranking: string;
  skills: string[];
  tag: string;
  track: string;
}

interface ChartProps {
  isBarChart: boolean;
  data: any[];
  isFetching: boolean;
  isFetched: boolean;
}

export interface AuthContextProps {
  auth: AuthResponse | undefined;
  email: string;
  redirect: string;
  userCameFrom: string | undefined;
  handleAuth: (value: AuthResponse | undefined) => void;
  handleEmail: (value: string) => void;
  handleRedirect: (value: string) => void;
  handleUserCameFrom: (value: string | undefined) => void;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  roleId: number;
  twoFactorAuth: boolean;
  two_factor_auth: boolean;
};

export type AuthResponse = {
  token: string;
  user: User;
};

type ProductResultImage = {
  url: string;
};

type ProductCategory = {
  id: number;
  name: string;
  createdat: string;
  user: string;
};

type ProductShop = {
  id: string;
  name: string;
};
export interface ProductResult {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: string;
  discount_price: string;
  tax: string;
  images: ProductResultImage[];
  admin_status: string;
  is_deleted: string;
  is_published: boolean;
  currency: string;
  createdat: string;
  updatedat: string;
  shop: ProductShop;
  category: ProductCategory;
  rating: number;
  user: string;
}

export interface ReviewData {
  productId: string;
  reviewId: string;
  customerName: string;
  description: string;
  isHelpful: number;
  rating: 0;
  reply: {
    id: string;
    name: string;
    message: string;
    createdAt: string;
  };
  numberOfPages: 0;
  updatedAt: string;
  createdAt: string;
}

export interface ReviewApiResponse {
  data: ReviewData[];
}

export interface RatsData {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  totalRating: number;
  averageRating: number;
  numberOfRating: number;
  productId: string;
  id: string;
}

export interface ExploreSEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
}
