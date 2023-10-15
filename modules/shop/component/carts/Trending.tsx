import React, { useState } from 'react';
import Image from 'next/image';
import { Products } from '../../../../@types';

interface TrendingProps {
  products: Products[];
}

const Trending: React.FC<TrendingProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="bg-white-100 w-full">
      <div className="container mx-auto px-4 sm:px-6 md:px-3 py-5">
        <div>
          <h1 className="text-4xl font-manropeEB">Recommeded For You</h1>
          <p className="text-xs mt-2 font-manropeB">Recommended courses for you</p>
        </div>
        <div className="w-full h-full py-10 overflow-x-auto whitespace-nowrap  flex gap-5">
          {products.map((product, index) => (
            <div key={product.id} className="product-card flex-none">
              <Image src={product.image[0].url} alt={product.name} width={300} height={100} className="h-52" />
              <h3 className="text-xl font-manropeB mt-2">{product.name}</h3>

              <div className="py-4">
                <p>{product.shopOwner}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
