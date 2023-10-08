import { useState } from 'react';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';

const ProductListingTable = () => {
  const productList = [
    {
      productName: 'Learning Design',
      vendor: 'Okereke James',
      id: 1234,
      dateAdded: '08-01-23',
      status: 'Sanctioned',
    },
    {
      productName: 'Frontend Development',
      vendor: 'Chukwu Chinaza',
      id: 1235,
      dateAdded: '08-02-23',
      status: 'Deleted',
    },
    {
      productName: 'Backend Development',
      vendor: 'Mark Essien',
      id: 1236,
      dateAdded: '08-03-23',
      status: 'Active',
    },
    {
      productName: 'Ethical Hacking',
      vendor: 'Shobande Abraham',
      id: 1237,
      dateAdded: '08-04-23',
      status: 'Active',
    },
    {
      productName: 'Product Management',
      vendor: 'John Paul',
      id: 1238,
      dateAdded: '08-05-23',
      status: 'Active',
    },
    {
      productName: 'Digital Marketing',
      vendor: 'Bakare Femi',
      id: 1239,
      dateAdded: '08-06-23',
      status: 'Active',
    },
    {
      productName: 'Fullstack Development',
      vendor: 'Gustavo Silas',
      id: 1233,
      dateAdded: '08-07-23',
      status: 'Active',
    },
  ];

  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productList);

  const handleSearch = (searchText: string) => {
    const filteredProduct: Array<{
      productName: string;
      vendor: string;
      id: number;
      dateAdded: string;
      status: string;
    }> = productList.filter((product) => product.productName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const handleFilter = (status: string) => {
    const sortedProducts = [...productList].sort((a, b) => {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);

      if (status === 'newest') {
        return dateB.getTime() - dateA.getTime(); // Newest to oldest
      } else {
        return dateA.getTime() - dateB.getTime(); // Oldest to newest
      }
    });
    setFilteredProducts(sortedProducts);
  };
  return (
    <>
      <SearchProduct handleSearchChange={handleSearch} />
      <FilterProduct handleFilter={handleFilter} />
    </>
  );
};
export default ProductListingTable;
