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
      dateAdded: '08-01-23',
      status: 'Deleted',
    },
    {
      productName: 'Backend Development',
      vendor: 'Mark Essien',
      id: 1236,
      dateAdded: '08-01-23',
      status: 'Active',
    },
    {
      productName: 'Ethical Hacking',
      vendor: 'Shobande Abraham',
      id: 1237,
      dateAdded: '08-01-23',
      status: 'Active',
    },
    {
      productName: 'Product Management',
      vendor: 'John Paul',
      id: 1238,
      dateAdded: '08-01-23',
      status: 'Active',
    },
    {
      productName: 'Digital Marketing',
      vendor: 'Bakare Femi',
      id: 1239,
      dateAdded: '08-01-23',
      status: 'Active',
    },
    {
      productName: 'Fullstack Development',
      vendor: 'Gustavo Silas',
      id: 1233,
      dateAdded: '08-01-23',
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
    const filteredProducts = productList.filter((product) => {
      const nameMatch = product.productName.toLowerCase().includes(searchVal.toLowerCase());
      const statusMatch = status === 'all' || product.status === status;
      return nameMatch && statusMatch;
    });
    setFilteredProducts(filteredProducts);
  };
  return (
    <>
      <SearchProduct handleSearchChange={handleSearch} />
      <FilterProduct handleFilter={handleFilter} />
    </>
  );
};
export default ProductListingTable;
