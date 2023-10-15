export type GenericProp<T> = {
  data: T[];
  tag: string;
};

export interface BadgeInterface extends React.ComponentPropsWithoutRef<'span'> {
  children: React.ReactNode;
  variant?: VariantType;
}

export type VariantType = 'outline' | 'fill';

export interface SectionProps extends React.ComponentPropsWithoutRef<'article'> {
  data: unknown[];
  action?: () => void;
  sectionTitle: string;
  tag: string;
  children?: React.ReactNode;
}

export type ProductList = {
  id: string;
  shop: {
    id: string;
    name: string;
  };
  name: string;
  description: string;
  quantity: number;
  category: number;
  user?: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
  };
  price: string;
  images: { url: string }[];
  discount_price: string;
  tax: string;
  admin_status: string;
  is_deleted: string;
  rating: null | number;
  is_published: boolean;
  currency: string;
  createdat: string;
  updatedat: string;
};
