export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: string;
  discount_price: string;
  tax: string;
  admin_status: string;
  is_deleted: string;
  is_published: true;
  currency: string;
  created_at: string;
  updated_at: string;
  shop_id: string;
  category_id: number;
  subcategory_id?: string;
  image_id?: string;
  rating_id?: string;
};
