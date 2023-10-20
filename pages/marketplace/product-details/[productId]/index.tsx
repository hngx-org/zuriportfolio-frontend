import { useRouter } from 'next/router';
import ProductDetailsDescription from '../../../../modules/marketplace/productDetailsDescription';


export default function ProductDetails() {
  const router = useRouter();
  
  return <ProductDetailsDescription productId={router.query.productId as string} />;
}
