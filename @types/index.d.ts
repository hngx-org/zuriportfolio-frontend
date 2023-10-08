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

export interface AdminTablePagination {
  handleClick?: any;
  disabledFn?: any;
  title: any;
  currentPage: any;
  totalPages: any;
  onPageChange: any;
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
  productImage: string;
  productTitle: string;
  cardStyle: string;
  productPrice: number;
  productRating: number;
  productSeller: string;
  discountPercentage?: number;
  tag?: string;
  tagBackground?: string;
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
  size?: 'lg' | 'md' | 'sm' | 'xl';
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
  productImage: string;
  productTitle: string;
  productSize: string;
  productColor: string;
  productSeller: string;
  productPrice: number;
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
}
export interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: StaticImageData;
  productRating: number;
  numReviews: number;
}

export interface WishlistProduct extends Product {
  productCategory: string;
  inStock: boolean;
  inCart: boolean;
}

export interface FavoriteProduct extends Product {
  isFavourite: boolean;
  productCreator: string;
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
  rating: string;
  users: string;
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

export interface SettingOptionTypes {
  accountManagement: boolean;
  notificationSettings: boolean;
  deleteAccount: boolean;
  refer: boolean;
}
