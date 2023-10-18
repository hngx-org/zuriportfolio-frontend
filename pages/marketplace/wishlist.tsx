import Wishlist from '../../modules/marketplace/wishlist';
import withUserAuth  from '../../helpers/withAuth';

const WishlistPage = () => {
  return <Wishlist />;
};

export default withUserAuth(WishlistPage);
