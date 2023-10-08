import FilterProduct from '@modules/super-admin/components/vendormanagement/FilterProduct';
import SearchProduct from '@modules/super-admin/components/vendormanagement/SearchProduct';
import { useState } from 'react';

const Dashboard = () => {
  const vendorsList = [
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Okereke James',
      email: 'okerekejames@gmail.com',
      amount: '$4,000.00',
      quantity: 3,
      date: '08-01-23',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Chukwu Chinaza',
      email: 'chukwuchinaza@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-02-23 ',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-03-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Charles Egesionu',
      email: 'charlesegesionu@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-04-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'John Paul',
      email: 'johnpaul@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-05-23 ',
      statusIndicatorSrc: '/assets/yellow-dot.png',
      statusText: 'Barred',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Bakare Femi',
      email: 'bakarefemi@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-06-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Gustavo Silas',
      email: 'gustavosilas@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-07-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Okereke James',
      email: 'okerekejames@gmail.com',
      amount: '$4,000.00',
      quantity: 3,
      date: '08-08-23',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Chukwu Chinaza',
      email: 'chukwuchinaza@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-09-23 ',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-10-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Charles Egesionu',
      email: 'charlesegesionu@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-11-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'John Paul',
      email: 'johnpaul@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-12-23 ',
      statusIndicatorSrc: '/assets/yellow-dot.png',
      statusText: 'Barred',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Bakare Femi',
      email: 'bakarefemi@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-13-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Gustavo Silas',
      email: 'gustavosilas@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-14-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
  ];

  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(vendorsList);

  const handleSearch = (searchText: string) => {
    const filteredProduct: Array<{
      vendorImgSrc: string;
      name: string;
      email: string;
      amount: string;
      quantity: number;
      date: string;
      statusIndicatorSrc: string;
      statusText: string;
    }> = vendorsList.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const handleFilter = (status: string) => {
    let filteredProducts = [...vendorsList];

    if (status === 'oldest') {
      filteredProducts = filteredProducts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (status === 'highest') {
      filteredProducts = filteredProducts.sort((a, b) => b.quantity - a.quantity);
    } else if (status === 'lowest') {
      filteredProducts = filteredProducts.sort((a, b) => a.quantity - b.quantity);
    } else if (status === 'newest') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    setFilteredProducts(filteredProducts);
  };
  return (
    <main>
      <SearchProduct handleSearchChange={handleSearch} />
      <FilterProduct handleFilter={handleFilter} />
    </main>
  );
};

export default Dashboard;
