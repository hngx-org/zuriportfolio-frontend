import React from 'react';
import ProductCard from '../ProductCard';
import MainLayout from '../../../../components/Layout/MainLayout';

export default function AllCategoriesPage() {
  // Sample product data (you can replace this with your actual data)
  const products = [
    // Product 1
    {
      image: '/path/to/product1-image.jpg',
      productName: 'Product 1',
      productPrice: '100.0',
      productOwner: 'Product Owner 1',
      productRating: 4,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount: 10,
    },
    // Product 2
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 3
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 3',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },

        // Product 4
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 5
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 6
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 7
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 8
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 9
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 10
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 11
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 12
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 13
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 14
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 15
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 16
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 17
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 18
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 19
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 20
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 21
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 22
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    },
      // Product 23
      {
        image: '/path/to/product2-image.jpg',
        productName: 'Product 2',
        productPrice: '120.0',
        productOwner: 'Product Owner 2',
        productRating: 3,
        showLimitedOffer: true,
        showTopPicks: false,
        showDiscount: false,
        discount: 15,
      },
        // Product 24
    {
      image: '/path/to/product2-image.jpg',
      productName: 'Product 2',
      productPrice: '120.0',
      productOwner: 'Product Owner 2',
      productRating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount: 15,
    }
     
    
  ];

  // Function to group products into rows
  // const groupProductsIntoRows = (products, itemsPerRow) => {
  //   const rows = [];
  //   for (let i = 0; i < products.length; i += itemsPerRow) {
  //     rows.push(products.slice(i, i + itemsPerRow));
  //   }
  //   return rows;
  // };

  const itemsPerRow = 4; // Number of cards per row
  // const productRows = groupProductsIntoRows(products, itemsPerRow);

  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
      <div className="category">
        {/* {productRows.map((row, index) => (
          <div key={index}>
            <p>Paragraph for Row {index + 1}</p>
            <div className="flex">
              {row.map((product, productIndex) => (
                <ProductCard key={productIndex} {...product} />
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </MainLayout>
  );
}



