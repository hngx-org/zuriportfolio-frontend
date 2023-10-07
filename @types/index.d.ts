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
