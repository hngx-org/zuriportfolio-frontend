import SpecificSubCategory from '@modules/marketplace/SpecificSubCategory';
import { useRouter } from 'next/router';

export default function SubCategoryPage() {
  const router = useRouter();
  const { subCategory } = router.query;

  return <SpecificSubCategory subCategory={subCategory as string} />;
}
